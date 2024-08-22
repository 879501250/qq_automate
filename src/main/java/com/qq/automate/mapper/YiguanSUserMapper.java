package com.qq.automate.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qq.automate.entity.YiguanSUser;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface YiguanSUserMapper extends BaseMapper<YiguanSUser> {

    // 查询所有的用户信息
    @Select("select * from yiguan_suser")
    List<YiguanSUser> listAll();// 返回的值是一个User类型的集合
}
