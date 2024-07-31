package com.qq.automate.controller;

import com.qq.automate.common.model.vo.YiguanDiaryVO;
import com.qq.automate.common.model.vo.YiguanMoodVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanMood;
import com.qq.automate.service.YiguanMoodService;
import com.qq.automate.service.YiguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 * 一罐——情绪之海列表 前端控制器
 * </p>
 *
 * @author Q
 * @since 2024-07-19 13:58:07
 */
@RestController
@RequestMapping("/yiguan")
public class YiguanController {
    @Autowired
    private YiguanMoodService yiguanMoodService;

    @Autowired
    private YiguanService yiguanService;

    @GetMapping("/listAllMood")
    public Result<List<YiguanMoodVO>> listAllMood() {
        return yiguanMoodService.listAllMood();
    }

    @GetMapping("/listNew")
    public Result<List<YiguanDiaryVO>> listNew(String lastSocreStr){
        return yiguanService.listNew(lastSocreStr);
    }
}
