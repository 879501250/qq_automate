package com.qq.automate.service;

import com.qq.automate.common.model.vo.YiguanQueryListParamsVO;
import com.qq.automate.common.result.Result;

public interface YiguanService {
    Result listNew(Long lastScore);

    Result setQueryListParams(YiguanQueryListParamsVO yiguanQueryListParamsVO);
}
