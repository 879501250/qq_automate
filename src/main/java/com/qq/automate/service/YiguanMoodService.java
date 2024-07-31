package com.qq.automate.service;

import com.qq.automate.common.model.vo.YiguanMoodVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanMood;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 一罐——情绪之海列表 服务类
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
public interface YiguanMoodService extends IService<YiguanMood> {

    // 获取所有情绪之海信息
    Result<List<YiguanMoodVO>> listAllMood();
}
