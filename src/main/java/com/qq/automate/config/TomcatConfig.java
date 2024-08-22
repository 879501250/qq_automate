package com.qq.automate.config;

import org.apache.catalina.connector.Connector;
import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TomcatConfig {
    /**
     * 解决高版本 tomcat 中的新特性：
     * 严格按照 RFC 3986规范进行访问解析，而 RFC 3986规范定义了Url中只允许包含英文字母（a-zA-Z）
     * 、数字（0-9）、-_.~4个特殊字符以及所有保留字符(RFC3986中指定了以下字符为保留字符：
     * ! * ’ ( ) ; : @ & = + $ , / ? # [ ])。而我们的系统在通过地址传参时，
     * 在url中传了一段json，传入的参数中有”{“不在RFC3986中的保留字段中，导致请求 400
     *
     * @return
     */
    @Bean
    public TomcatServletWebServerFactory webServerFactory() {
        TomcatServletWebServerFactory factory = new TomcatServletWebServerFactory();
        factory.addConnectorCustomizers((Connector connector) -> {
            connector.setProperty("relaxedPathChars", "\"<>[\\]^`{|}");
            connector.setProperty("relaxedQueryChars", "\"<>[\\]^`{|}");
        });
        return factory;
    }
}
