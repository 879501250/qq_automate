package com.qq.automate.service.impl;

import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qq.automate.common.constant.YiguanConstant;
import com.qq.automate.common.model.vo.YiguanMoodVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanMood;
import com.qq.automate.mapper.YiguanMoodMapper;
import com.qq.automate.service.YiguanMoodService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 * 一罐——情绪之海列表 服务实现类
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@Service
public class YiguanMoodServiceImpl extends ServiceImpl<YiguanMoodMapper, YiguanMood> implements YiguanMoodService {

    @Autowired
    private YiguanMoodMapper yiguanMoodMapper;

    private List<YiguanMoodVO> moodCache;

    private List<YiguanMoodVO> getMoodCache() {
        if (moodCache == null) {
            moodCache = yiguanMoodMapper.findAll();
        }
        return moodCache;
    }

    @Override
    public Result listAllMood() {
        return Result.success().data("moods", getMoodCache());
    }

    @Override
    public Result refreshMood() {
        String result = HttpRequest.get(YiguanConstant.YIGUAN_LIST_MOOD_URL).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        JSONArray datas = jsonObject.getJSONArray("data");
        if (datas != null && !datas.isEmpty()) {
            List<YiguanMood> moods = new ArrayList<>();
            datas.stream()
                    .map(data -> (JSONObject) data)
                    .filter(data -> data.get("name").equals("全部"))
                    .forEach(data -> {
                        JSONArray listAll = data.getJSONArray("listAll");
                        for (int i = 0; i < listAll.size(); i++) {
                            JSONArray list = listAll.get(i, JSONObject.class).getJSONArray("list");
                            for (int j = 0; j < list.size(); j++) {
                                YiguanMood yiguanMood = new YiguanMood();
                                yiguanMood.setId(list.getByPath("[" + j + "].id", String.class));
                                yiguanMood.setName(list.getByPath("[" + j + "].name", String.class));
                                moods.add(yiguanMood);
                            }
                        }
                    });
            yiguanMoodMapper.updateAll(moods);
        }
        return Result.success();
    }
}
