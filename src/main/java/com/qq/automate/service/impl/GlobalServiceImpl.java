package com.qq.automate.service.impl;

import com.qq.automate.common.cache.GlobalCache;
import com.qq.automate.common.constant.GlobalConstant;
import com.qq.automate.common.result.Result;
import com.qq.automate.service.GlobalService;
import org.springframework.stereotype.Service;

@Service
public class GlobalServiceImpl implements GlobalService {
    @Override
    public Result getChinaProvinces() {
        return Result.success().data(GlobalCache.getInstance().get(GlobalConstant.CHINA_PROVINCES));
    }
}
