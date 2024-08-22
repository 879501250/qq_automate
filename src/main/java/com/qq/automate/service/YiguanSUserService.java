package com.qq.automate.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;

import java.util.List;

public interface YiguanSUserService extends IService<YiguanSUser> {
    Result listSUsers();

    Result addSUser(YiguanSUser yiguanSUser);

    Result isSUser(String uid);
}
