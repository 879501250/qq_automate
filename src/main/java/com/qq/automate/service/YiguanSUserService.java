package com.qq.automate.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface YiguanSUserService extends IService<YiguanSUser> {
    Result listSUsers();

    Result addSUser(YiguanSUser yiguanSUser);

    Result updateSUser(YiguanSUser yiguanSUser);

    Result isSUser(String uid);

    Result getSUserById(String uid);

    Result updateSUserLastActiveTime(String uid, LocalDateTime lastActiveTime);

    Result updateSUserAlbumIds(String uid, String albumId);
}
