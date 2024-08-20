package com.qq.automate.service.impl;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qq.automate.common.constant.YiguanConstant;
import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.model.vo.YiguanListVO;
import com.qq.automate.common.model.vo.YiguanUserVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;
import com.qq.automate.service.YiguanService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class YiguanServiceImpl implements YiguanService {


    @Override
    public Result listNew(YiguanListVO yiguanListVO) {
        // 参数校验

        String result = HttpRequest.get(YiguanConstant.YIGUAN_LIST_NEW_URL).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        JSONArray datas = jsonObject.getJSONArray("data");
        ArrayList<YiguanDiaryVO> list = new ArrayList<>(datas.size());
        Long lastScore = yiguanListVO.getLastScore();
        Long temp = lastScore;
        for (int i = datas.size() - 1; i >= 0; i--) {
            JSONObject data = datas.get(i, JSONObject.class);
            // 判断时间
            Long score = data.getLong("createTime");
            if (lastScore == null || lastScore < score) {
                // 判断性别
                Integer gender = data.getByPath("user.gender", Integer.class);
                if (2 == gender) {
                    // 内容太多了，现在只看真身或者带专辑的罐头
                    Boolean isReal = data.getByPath("user.isReal", Boolean.class);
                    String mood = data.getByPath("mood.name", String.class);
                    if (Boolean.FALSE.equals(isReal)) {
                        JSONObject album = data.getJSONObject("album");
                        if (album == null) {
                            if (!mood.equals("此刻") && !mood.equals("秘密") && !mood.equals("求撩")) {
                                continue;
                            }
                        }
                    }
                    YiguanDiaryVO diaryVO = JSONUtil.toBean(data, YiguanDiaryVO.class);
                    diaryVO.setMood(mood);
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
                    diaryVO.setIpLocation(getIP(diaryVO.getId()));
                    List<String> photos = diaryVO.getPhotos();
                    for (int j = 0; j < photos.size(); j++) {
                        photos.set(j, data.getByPath("photos.[" + j + "].url", String.class));
                    }
                    list.add(diaryVO);
                    System.out.println(diaryVO.getCreateTime());
                }
                temp = score - 1;
            }
        }
        return Result.success().data("diaries", list).data("lastScore", temp);
    }

    /**
     * 根据罐头 id 获取 ip
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
