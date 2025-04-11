package com.qq.automate.service.impl;

import cn.hutool.core.date.DateUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qq.automate.common.constant.YiguanConstant;
import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.model.vo.YiguanQueryListParamsVO;
import com.qq.automate.common.model.vo.YiguanUserVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanAlbum;
import com.qq.automate.service.YiguanAlbumService;
import com.qq.automate.service.YiguanSUserService;
import com.qq.automate.service.YiguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.config.FixedRateTask;
import org.springframework.scheduling.config.ScheduledTask;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class YiguanServiceImpl implements YiguanService {

    @Autowired
    private YiguanSUserService yiguanSUserService;

    @Autowired
    private YiguanAlbumService yiguanAlbumService;

    @Autowired
    private ScheduledTaskRegistrar scheduledTaskRegistrar;

    @Override
    public Result listNew(Long lastScore) {
        if (lastScore == null) {
            lastScore = 0L;
        }
        List<YiguanDiaryVO> list = new LinkedList<>();
        Long temp = listDiarys(list, lastScore, false);
        return Result.success().data("diaries", list).data("lastScore", temp);
    }

    private Long listDiarys(List<YiguanDiaryVO> list, Long lastScore, boolean isBackgroundQuery) {
        String result = HttpRequest.get(YiguanConstant.YIGUAN_LIST_NEW_URL).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        JSONArray datas = jsonObject.getJSONArray("data");
        Long temp = lastScore;
        YiguanDiaryVO diaryVO;
        for (int i = datas.size() - 1; i >= 0; i--) {
            JSONObject data = datas.get(i, JSONObject.class);
            // 判断时间
            Long score = data.getLong("createTime");
            if (lastScore < score) {
                // 判断性别
                Integer gender = data.getByPath("user.gender", Integer.class);
                if (2 == gender) {
                    collectAlbum(data.getJSONObject("album"));
                    diaryVO = filterDiary(data, isBackgroundQuery);
                    if (diaryVO != null) {
                        YiguanUserVO user = diaryVO.getUser();
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
                temp = Math.max(temp, score);
            }
        }
        return temp;
    }

    /**
     * 收集专辑信息
     *
     * @param album
     */
    private void collectAlbum(JSONObject album) {
        if (album != null) {
            YiguanAlbum yiguanAlbum = new YiguanAlbum();
            yiguanAlbum.setAlbumId(album.getStr("id"));
            yiguanAlbum.setUid(album.getStr("uid"));
            yiguanAlbum.setCreateTime(DateUtil.format(DateUtil.date(album.getLong("createTime")),
                    "yyyy-MM-dd HH:mm:ss"));
            yiguanAlbumService.insertOrUpdateAlbum(yiguanAlbum);
        }
    }

    /**
     * 对罐头按查询条件进行筛选
     *
     * @param data
     * @param isBackgroundQuery 是否是后台查询，后台查询时为防止数据过多，只筛选 suser 和匿名用户的专辑
     * @return
     */
    private YiguanDiaryVO filterDiary(JSONObject data, boolean isBackgroundQuery) {
        YiguanDiaryVO diaryVO = JSONUtil.toBean(data, YiguanDiaryVO.class);
        Boolean isReal = data.getByPath("user.isReal", Boolean.class);
        JSONObject album = data.getJSONObject("album");
        if (!isBackgroundQuery && queryListParams == null) {
            // 内容太多了，现在只看真身或者带专辑的罐头
            if (Boolean.FALSE.equals(isReal) && album == null) {
                // 不是真身，也不包含专辑就不看
                diaryVO = null;
            } else {
                diaryVO.setMood(data.getByPath("mood.name", String.class));
            }
        } else {
            String mood = data.getByPath("mood.name", String.class);
            diaryVO.setMood(mood);
            // 是否可以获取到真身，即真身用户或带专辑的匿名用户
            if (isReal || album != null) {
                YiguanUserVO user = diaryVO.getUser();
                if (isReal) {
                    user.setAge(data.getStr("age"));
                } else {
                    user.setId(album.getStr("uid"));
                }
                // 是否是 suser
                if (Boolean.TRUE.equals(yiguanSUserService.isSUser(user.getId()).getData())) {
                    diaryVO.setIsSUser(true);
                    yiguanSUserService.updateSUserLastActiveTime(user.getId(),
                            LocalDateTime.parse(diaryVO.getScore(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                } else {
                    // 不满足真身的查询条件就不显示
                    if (!queryListParams.vaildateRealMoods(diaryVO)) {
                        diaryVO = null;
                    }
                    // 如果是后台查询，只要匿名用户的罐头
                    if (isBackgroundQuery && user.getAvatar() != null) {
                        diaryVO = null;
                    }
                }
            } else if (!isBackgroundQuery && queryListParams.vaildateShadow()) {
                if (!queryListParams.vaildateShadowMoods(diaryVO) && !queryListParams.vaildateContent(diaryVO)) {
                    diaryVO.setIpLocation(getIP(diaryVO.getId()));
                    if (!queryListParams.vaildateIp(diaryVO)) {
                        diaryVO = null;
                    }
                }
            } else {
                diaryVO = null;
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

    // 用户凭证，用的是 jwt
    private static String ygt = null;

    @Override
    public Result getYgt(Boolean refresh) {
        if (Boolean.TRUE.equals(refresh) || ygt == null) {
            try {
                refreshYgt();
            } catch (Exception e) {
                return Result.error().message(e.getMessage());
            }
        }
        return Result.success().data(ygt);
    }


    private ScheduledTask backgroundQueryTask;
    private static final BackgroundQueryData backgroundQueryData = new BackgroundQueryData();

    @Override
    public Result startBackgroundQueryScheduler(Long lastScore, Long interval) {
        if (backgroundQueryTask != null) {
            return Result.success().message("已存在运行中的后台查询任务~");
        }
        if (interval == null || interval < 0) {
            interval = 1L;
        }
        backgroundQueryData.setLastScore(lastScore);
        backgroundQueryTask = scheduledTaskRegistrar.scheduleFixedRateTask(
                new FixedRateTask(() -> {
                    backgroundQueryData.setLastScore(listDiarys(
                            backgroundQueryData.getYiguanDiaryList(),
                            backgroundQueryData.getLastScore(),
                            true));
                },
                        Duration.ofSeconds(interval),
                        Duration.ZERO));
        System.out.println("开始执行后台查询任务~");
        return Result.success().message("开始执行后台查询任务~");
    }

    private static class BackgroundQueryData {
        Long lastScore;
        LinkedList<YiguanDiaryVO> yiguanDiaryList;

        BackgroundQueryData() {
            lastScore = null;
            yiguanDiaryList = new LinkedList<>();
        }

        public Long getLastScore() {
            return lastScore;
        }

        public void setLastScore(Long lastScore) {
            this.lastScore = lastScore;
        }

        public LinkedList<YiguanDiaryVO> getYiguanDiaryList() {
            return yiguanDiaryList;
        }

        public void removeYiguanDiary(String id) {
            while (!yiguanDiaryList.isEmpty()) {
                YiguanDiaryVO yiguanDiaryVO = yiguanDiaryList.pollFirst();
                if (id.equals(yiguanDiaryVO.getId())) {
                    break;
                }
            }
        }

        public void clearData() {
            yiguanDiaryList.clear();
        }

    }

    @Override
    public Result stopBackgroundQueryScheduler() {
        if (backgroundQueryTask == null) {
            return Result.success().code(2).message("暂无后台查询任务~");
        }
        backgroundQueryTask.cancel();
        backgroundQueryTask = null;
        System.out.println("后台查询任务已暂停~");
        return Result.success().message("后台查询任务暂停成功~").data("lastScore", backgroundQueryData.getLastScore());
    }

    @Override
    public Result getBackgroundYiguanDiaryList() {
        return Result.success().data("diaries", backgroundQueryData.getYiguanDiaryList());
    }

    @Override
    public Result removeBackgroundYiguanDiary(String id) {
        backgroundQueryData.removeYiguanDiary(id);
        return Result.success();
    }

    @Override
    public Result clearBackgroundYiguanDiary() {
        backgroundQueryData.clearData();
        return Result.success().message("后台列表已清空~");
    }

    private void refreshYgt() {
        HashMap<String, Object> map = new HashMap<>();
        map.put("phone", "15068696639");
        map.put("password", "qq20100306");
        String result = HttpRequest.get(YiguanConstant.YIGUAN_LOGIN_URL).form(map).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        if (jsonObject.get("code", Integer.class) != 0) {
            System.out.println(result);
            throw new RuntimeException(jsonObject.get("msg", String.class));
        }
        ygt = jsonObject.getByPath("data.YGT", String.class);
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
