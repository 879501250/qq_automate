package com.qq.automate.service.impl;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.http.HttpRequest;
import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.qq.automate.common.constant.YiguanConstant;
import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.service.YiguanService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class YiguanServiceImpl implements YiguanService {


    @Override
    public Result<List<YiguanDiaryVO>> listNew(String lastSocreStr) {
        // 参数校验
        DateTime lastSocre;
        try {
            lastSocre = DateUtil.parse(lastSocreStr);
        } catch (Exception e) {
            lastSocre = null;
            e.printStackTrace();
        }
        if (lastSocreStr == null) {
            lastSocre = DateUtil.yesterday();
        }
        String result = HttpRequest.get(YiguanConstant.LIST_NEW_URL).execute().body();
        JSONObject jsonObject = JSONUtil.parseObj(result);
        JSONArray datas = jsonObject.getJSONArray("data");
        ArrayList<YiguanDiaryVO> list = new ArrayList<>(datas.size());
        for (int i = datas.size() - 1; i >= 0; i--) {
            JSONObject data = datas.get(i, JSONObject.class);
            // 判断时间
            DateTime temp = DateUtil.parse(data.getStr("score"));
            if (lastSocre.compareTo(temp) < 0) {
                // 判断性别
                Integer gender = data.getByPath("user.gender", Integer.class);
                if (2 == gender) {
                    YiguanDiaryVO diaryVO = JSONUtil.toBean(data, YiguanDiaryVO.class);
                    diaryVO.setMood(data.getByPath("mood.name", String.class));
                    if (diaryVO.getUser().getId() == null) {
                        diaryVO.getUser().setAge(data.getStr("age"));
                    }
                    if (diaryVO.getAlbum() != null) {
                        diaryVO.getUser().setId(data.getByPath("album.uid", String.class));
                    }
                    list.add(diaryVO);
                }
            }
        }

        return Result.success(list);
    }
}
