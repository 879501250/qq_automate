package com.qq.automate.service.impl;

import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qq.automate.common.constant.YiguanConstant;
import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.model.vo.YiguanQueryListParamsVO;
import com.qq.automate.common.model.vo.YiguanUserVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.service.YiguanSUserService;
import com.qq.automate.service.YiguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class YiguanServiceImpl implements YiguanService {

    @Autowired
    private YiguanSUserService yiguanSUserService;


    @Override
    public Result listNew(Long lastScore) {
        String result = HttpRequest.get(YiguanConstant.YIGUAN_LIST_NEW_URL).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        JSONArray datas = jsonObject.getJSONArray("data");
        ArrayList<YiguanDiaryVO> list = new ArrayList<>(datas.size());
        Long temp = lastScore;
        YiguanDiaryVO diaryVO;
        for (int i = datas.size() - 1; i >= 0; i--) {
            JSONObject data = datas.get(i, JSONObject.class);
            // 判断时间
            Long score = data.getLong("createTime");
            if (lastScore == null || lastScore < score) {
                // 判断性别
                Integer gender = data.getByPath("user.gender", Integer.class);
                if (2 == gender) {
                    diaryVO = filterDiary(data);
                    if (diaryVO != null) {
                        YiguanUserVO user = diaryVO.getUser();
                        if (user.getId() == null) {
                            user.setAge(data.getStr("age"));
                        }
                        if (diaryVO.getAlbum() != null) {
                            user.setId(data.getByPath("album.uid", String.class));
                        }
                        if (user.getAvatar() != null) {
                            user.setAvatar(YiguanConstant.YIGUAN_PHOTO_URL + data.getByPath("user.avatar.key", String.class));
                        }
                        if (diaryVO.getIpLocation() == null) {
                            diaryVO.setIpLocation(getIP(diaryVO.getId()));
                        }
                        List<String> photos = diaryVO.getPhotos();
                        for (int j = 0; j < photos.size(); j++) {
                            photos.set(j, data.getByPath("photos.[" + j + "].url", String.class));
                        }
                        list.add(diaryVO);
                    }
                }
            }
            temp = score;
        }
        return Result.success().data("diaries", list).data("lastScore", temp);
    }

    // 对罐头按查询条件进行筛选
    private YiguanDiaryVO filterDiary(JSONObject data) {
        YiguanDiaryVO diaryVO = JSONUtil.toBean(data, YiguanDiaryVO.class);
        Boolean isReal = data.getByPath("user.isReal", Boolean.class);
        if (queryListParams == null) {
            // 内容太多了，现在只看真身或者带专辑的罐头
            if (Boolean.FALSE.equals(isReal) && data.getJSONObject("album") == null) {
                // 不是真身，也不包含专辑就不看
                diaryVO = null;
            } else {
                diaryVO.setMood(data.getByPath("mood.name", String.class));
            }
        } else {
            String mood = data.getByPath("mood.name", String.class);
            diaryVO.setMood(mood);
            if (isReal || data.getJSONObject("album") != null) {
                if (isReal) {
                    if (Boolean.TRUE.equals(yiguanSUserService.isSUser(diaryVO.getUser().getId()).getData())) {
                        diaryVO.setIsSUser(true);
                    }
                } else {
                    if (Boolean.TRUE.equals(
                            yiguanSUserService.isSUser(data.getByPath("album.uid", String.class)).getData())) {
                        diaryVO.setIsSUser(true);
                    }
                }
                if (!Boolean.TRUE.equals(diaryVO.getIsSUser())
                        && !queryListParams.vaildateShadowMoods(diaryVO)) {
                    diaryVO = null;
                }
            } else {
                if (!queryListParams.vaildateShadowMoods(diaryVO) && !queryListParams.vaildateContent(diaryVO)) {
                    diaryVO.setIpLocation(getIP(diaryVO.getId()));
                    if (!queryListParams.vaildateIp(diaryVO)) {
                        diaryVO = null;
                    }
                }
            }
        }
        return diaryVO;
    }

    private static YiguanQueryListParamsVO queryListParams;

    @Override
    public Result setQueryListParams(YiguanQueryListParamsVO yiguanQueryListParamsVO) {
        queryListParams = yiguanQueryListParamsVO;
        return Result.success().data(queryListParams);
    }

    /**
     * 根据罐头 id 获取 ip，没查到就为空字符串
     *
     * @param id
     * @return
     */
    private String getIP(String id) {
        String result = HttpRequest.get(YiguanConstant.YIGUAN_DIARY_Detail_URL).form("id", id).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        return jsonObject.getByPath("data.ipLocation", String.class);
    }

    /**
     * 根据罐头 id 判断用户是否老用户
     *
     * @param id
     * @return
     */
    private Boolean isOldUser(String id) {
        String url = "https://api.jijigugu.club/session/getUserInfoByObject?type=1&isReal=true&id=" + id;
        return HttpRequest.get(url)
                .header("ygt", "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjg1MzUzMDQsImV4cCI6MTcyNDg1MjkwNX0.BJC2YsAJLExvswJLEgXNLDrTbMUiPDBiR2hF2axF7Qw")
                .execute().body().contains("老用户");
    }
}
