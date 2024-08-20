package com.qq.automate.service;

import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.model.vo.YiguanListVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;

import java.util.List;

public interface YiguanService {
    Result listNew(YiguanListVO yiguanListVO);

}
