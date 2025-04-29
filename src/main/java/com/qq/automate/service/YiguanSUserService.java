package com.qq.automate.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qq.automate.common.model.PageResult;
import com.qq.automate.common.model.query.YiguanSUserQuery;
import com.qq.automate.common.model.vo.YiguanSUserVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface YiguanSUserService extends IService<YiguanSUser> {

    Result addSUser(YiguanSUser yiguanSUser);

    Result updateSUser(YiguanSUser yiguanSUser);

    Result isSUser(String uid);

    Result getSUserById(String uid);

    Result updateSUserLastActiveTime(String uid, LocalDateTime lastActiveTime);

    PageResult<YiguanSUserVO> listSUsersPage(YiguanSUserQuery query);
}
