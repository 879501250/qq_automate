package com.qq.automate.config;

import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.qq.automate.interceptor.MybatisSqlInterceptor;
import jakarta.annotation.PostConstruct;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class MyBatisPlusConfig {
    @Autowired
    private List<SqlSessionFactory> sqlSessionFactoryList;

    /**
     * 添加 Mybatis 拦截器
     * 主要是为了保证数据权限拦截器在分页插件拦截器之前执行 sql 的修改，如果不在这里手动添加的话，PageInterceptor会先执行
     * 先添加的拦截器后执行
     */
    @PostConstruct
    public void addMybatisInterceptor() {
        for (SqlSessionFactory sqlSessionFactory : sqlSessionFactoryList) {
            org.apache.ibatis.session.Configuration configuration = sqlSessionFactory.getConfiguration();
            // 将数据权限拦截器添加到MybatisPlusInterceptor拦截器链
            MybatisPlusInterceptor mybatisPlusInterceptor = new MybatisPlusInterceptor();
            // 先添加PageHelper分页插件拦截器，再添加MybatisPlusInterceptor拦截器
            mybatisPlusInterceptor.addInnerInterceptor(new PaginationInnerInterceptor());
            mybatisPlusInterceptor.addInnerInterceptor(new MybatisSqlInterceptor());
            // configuration.addInterceptor(new PageInterceptor());
            configuration.addInterceptor(mybatisPlusInterceptor);
        }
    }
}
