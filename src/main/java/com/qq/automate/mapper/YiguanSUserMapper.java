package com.qq.automate.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.qq.automate.entity.YiguanSUser;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface YiguanSUserMapper extends BaseMapper<YiguanSUser> {

    // 查询所有的用户信息
    @Select("select * from yiguan_suser")
    List<YiguanSUser> listAll();// 返回的值是一个User类型的集合

    // 更新 suser 发罐头的时间
    @Update("update yiguan_suser set lastActiveTime = #{lastActiveTime} where uid = #{uid}")
    int updateLastActiveTime(@Param("uid") String uid,
                             @Param("lastActiveTime") LocalDateTime lastActiveTime);

    @Update("update yiguan_suser set albumIds = #{albumIds} where uid = #{uid}")
    int updateAlbumIds(@Param("uid") String uid, @Param("albumIds") String albumIds);
}
