package com.qq.automate.controller;

import com.qq.automate.common.result.Result;
import com.qq.automate.service.GlobalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/global")
public class GlobalController {

    @Autowired
    private GlobalService globalService;

    @GetMapping("/getChinaProvinces")
    public Result getChinaProvinces() {
        return globalService.getChinaProvinces();
    }
}
