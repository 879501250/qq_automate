package com.qq.automate.common.model;

import com.baomidou.mybatisplus.core.metadata.OrderItem;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
public class PageQuery implements Serializable {

    @Serial
    private static final long serialVersionUID = -3462299344530193694L;
    // 页码
    private Integer pageNo;
    // 页面大小
    private Integer pageSize;
    // 排序字段
    private String sortBy;
    // 是否升序
    private Boolean isAsc;

    /**
     * 将 PageQuery 转化为 Mybatis Plus Page
     *
     * @param orderItems 手动设置排序条件
     * @param <T>        泛型
     * @return Mybatis Plus Page
     */
    public <T> Page<T> toMpPage(OrderItem... orderItems) {
        // 1. 分页条件
        Page<T> p = Page.of(pageNo, pageSize);
        // 2. 排序提交
        if (orderItems != null && orderItems.length > 0) {
            p.addOrder(orderItems);
            return p;
        }
        if (sortBy != null) {
            p.addOrder(buildOrderItem(sortBy, isAsc));
            return p;
        }
        return p;
    }

    // 手动传入排序方式
    public <T> Page<T> toMpPage(String defaultSortBy, boolean isAsc) {
        return this.toMpPage(buildOrderItem(defaultSortBy, isAsc));
    }

    private OrderItem buildOrderItem(String sortBy, boolean isAsc) {
        return isAsc ? OrderItem.asc(sortBy) : OrderItem.desc(sortBy);
    }

    // 默认 按照 CreateTime 降序排序
    public <T> Page<T> toMpPageDefaultSortByCreateTimeDesc() {
        return this.toMpPage("create_time", false);
    }

    // 默认 按照 UpdateTime 降序排序
    public <T> Page<T> toMpPageDefaultSortByUpdateTimeDesc() {
        return this.toMpPage("update_time", false);
    }
}
