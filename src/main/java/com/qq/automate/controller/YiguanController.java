package com.qq.automate.controller;

import com.qq.automate.common.model.vo.YiguanQueryListParamsVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;
import com.qq.automate.service.YiguanMoodService;
import com.qq.automate.service.YiguanSUserService;
import com.qq.automate.service.YiguanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    @Autowired
    private YiguanSUserService yiguanSUserService;

    @GetMapping("/listAllMood")
    public Result listAllMood() {
        return yiguanMoodService.listAllMood();
    }

    @GetMapping("/refreshMood")
    public Result refreshMood() {
        return yiguanMoodService.refreshMood();
    }

    @GetMapping("/listNew")
    public Result listNew(Long lastScore) {
        return yiguanService.listNew(lastScore);
    }

    @PostMapping("/setQueryListParams")
    public Result setQueryListParams(YiguanQueryListParamsVO yiguanQueryListParamsVO) {
        return yiguanService.setQueryListParams(yiguanQueryListParamsVO);
    }
    @GetMapping("/isSUser")
    public Result isSUser(String uid) {
        return yiguanSUserService.isSUser(uid);
    }

    @GetMapping("/listSUsers")
    public Result listSUsers() {
        return yiguanSUserService.listSUsers();
    }

    @PostMapping("/addSUser")
    public Result addSUser(@RequestBody YiguanSUser yiguanSUser) {
        return yiguanSUserService.addSUser(yiguanSUser);
    }

    @PostMapping("/updateSUser")
    public Result updateSUser(@RequestBody YiguanSUser yiguanSUser) {
        return yiguanSUserService.updateSUser(yiguanSUser);
    }

    @GetMapping("/getSUserById")
    public Result getSUserById(String uid) {
        return yiguanSUserService.getSUserById(uid);
    }

    @GetMapping("/getYgt")
    public Result getYgt(Boolean refresh) {
        return yiguanService.getYgt(refresh);
    }

    @GetMapping("/startBackgroundQueryScheduler")
    public Result startBackgroundQueryScheduler(Long lastScore,Long interval) {
        return yiguanService.startBackgroundQueryScheduler(lastScore,interval);
    }

    @GetMapping("/stopBackgroundQueryScheduler")
    public Result stopBackgroundQueryScheduler() {
        return yiguanService.stopBackgroundQueryScheduler();
    }

    @GetMapping("/getBackgroundYiguanDiaryList")
    public Result getBackgroundYiguanDiaryList() {
        return yiguanService.getBackgroundYiguanDiaryList();
    }

    @GetMapping("/removeBackgroundYiguanDiary")
    public Result removeBackgroundYiguanDiary(String id) {
        return yiguanService.removeBackgroundYiguanDiary(id);
    }

    @GetMapping("/clearBackgroundYiguanDiary")
    public Result clearBackgroundYiguanDiary() {
        return yiguanService.clearBackgroundYiguanDiary();
    }
}
