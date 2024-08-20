package com.qq.automate.service.impl;

import com.qq.automate.common.model.vo.YiguanMoodVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanMood;
import com.qq.automate.mapper.YiguanMoodMapper;
import com.qq.automate.service.YiguanMoodService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 * 一罐——情绪之海列表 服务实现类
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@Service
public class YiguanMoodServiceImpl extends ServiceImpl<YiguanMoodMapper, YiguanMood> implements YiguanMoodService {

    @Autowired
    private YiguanMoodMapper yiguanMoodMapper;

    @Override
    public Result listAllMood() {
        return Result.success().data("moods", yiguanMoodMapper.findAll());
    }
}
