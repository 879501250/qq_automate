package com.qq.automate;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.qq.automate.mapper") // 扫描 mapper 接口，就不用加 @Mapper 了
public class QqAutomateApplication {

    public static void main(String[] args) {
        SpringApplication.run(QqAutomateApplication.class, args);
    }

}
