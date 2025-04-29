package com.qq.automate.common.model;

import cn.hutool.core.bean.BeanUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.Collections;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
public class PageResult<T> implements Serializable {

    @Serial
    private static final long serialVersionUID = 8432959071452917053L;
    // 总条数
    private Long total;
    // 总页数
    private Long pages;
    // 当前页数数据集合
    private List<T> list;

    /**
     * 返回空的分页结果
     *
     * @param p   MyBatis Plus 的分页结果
     * @param <V> 目标 VO 类型
     * @param <P> 原始的 PO 类型
     * @return VO 的分页结果
     */
    public static <V, P> PageResult<V> empty(Page<P> p) {
        return new PageResult<>(p.getTotal(), p.getPages(), Collections.emptyList());
    }

    /**
     * 将 MyBatis Plus 的分页结果转换为 VO 的分页结果
     *
     * @param p       MyBatis Plus 的分页结果
     * @param voClass 目标 VO 类型的字节码
     * @param <V>     目标 VO 类型
     * @param <P>     原始的 PO 类型
     * @return VO 的分页结果
     */
    public static <V, P> PageResult<V> of(Page<P> p, Class<V> voClass) {
        // 1. 非空校验
        List<P> records = p.getRecords();
        if (records == null || records.isEmpty()) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2. 数据转换
        List<V> vos = BeanUtil.copyToList(records, voClass);
        // 3. 封装返回
        return new PageResult<>(p.getTotal(), p.getPages(), vos);
    }

    /**
     * 将 Mybatis Plus分页结果转为 VO分页结果，允许用户自定义 PO到 VO的转换方式
     *
     * @param p         Mybatis Plus的分页结果
     * @param convertor PO 到 VO的转换函数
     * @param <V>       目标 VO 类型
     * @param <P>       原始 PO 类型
     * @return VO 的分页结果
     */
    public static <V, P> PageResult<V> of(Page<P> p, Function<P, V> convertor) {
        // 1. 非空校验
        List<P> records = p.getRecords();
        if (records == null || records.isEmpty()) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2. 数据转换
        List<V> vos = records.stream().map(convertor).collect(Collectors.toList());
        // 3. 封装返回
        return new PageResult<>(p.getTotal(), p.getPages(), vos);
    }

    /**
     * 将 Mybatis Plus分页结果转为 VO分页结果，允许用户自定义 PO到 VO的转换方式
     *
     * @param p         Mybatis Plus的分页结果
     * @param convertor PO 到 VO的转换函数
     * @param <V>       目标 VO 类型
     * @param <P>       原始 PO 类型
     * @return VO 的分页结果
     */
    public static <V, P> PageResult<V> ofList(Page<P> p, Function<List<P>, List<V>> convertor) {
        // 1. 非空校验
        List<P> records = p.getRecords();
        if (records == null || records.isEmpty()) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2. 数据转换
        List<V> vos = convertor.apply(records);
        // 3. 封装返回
        return new PageResult<>(p.getTotal(), p.getPages(), vos);
    }
}
