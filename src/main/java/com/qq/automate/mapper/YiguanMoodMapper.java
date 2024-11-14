package com.qq.automate.mapper;

import com.qq.automate.common.model.vo.YiguanMoodVO;
import com.qq.automate.entity.YiguanMood;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 * 一罐——情绪之海列表 Mapper 接口
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
public interface YiguanMoodMapper extends BaseMapper<YiguanMood> {
    @Select("SELECT id,name,real_enable,shadow_enable FROM yiguan_mood ORDER BY sort")
    List<YiguanMoodVO> findAll();

    void updateAll(List<YiguanMood> list);
}
