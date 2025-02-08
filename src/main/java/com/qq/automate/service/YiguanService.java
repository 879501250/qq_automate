package com.qq.automate.service;

import com.qq.automate.common.model.vo.YiguanQueryListParamsVO;
import com.qq.automate.common.result.Result;

public interface YiguanService {
    Result listNew(Long lastScore);

    Result setQueryListParams(YiguanQueryListParamsVO yiguanQueryListParamsVO);

    Result getYgt(Boolean refresh);

    Result startBackgroundQueryScheduler(Long lastScore,Long interval);

    Result stopBackgroundQueryScheduler();

    Result getBackgroundYiguanDiaryList();

    Result removeBackgroundYiguanDiary(String id);

    Result clearBackgroundYiguanDiary();
}
