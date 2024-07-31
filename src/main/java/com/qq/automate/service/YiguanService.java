package com.qq.automate.service;

import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.result.Result;

import java.util.List;

public interface YiguanService {
    Result<List<YiguanDiaryVO>> listNew(String lastSocreStr);
}
