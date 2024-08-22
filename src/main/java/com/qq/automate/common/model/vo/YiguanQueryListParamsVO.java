package com.qq.automate.common.model.vo;

import lombok.Builder;
import lombok.Data;

import java.util.List;

/**
 * 一罐——查询最新罐头列表的参数
 */
@Data
@Builder
public class YiguanQueryListParamsVO {
    // 查询结果中真身用户创建的罐头所在只海要在这个列表中
    private List<String> realQueryMoods;
    // 查询结果中分身用户创建的罐头所在只海要在这个列表中
    private List<String> shadowQueryMoods;
    // 查询结果中分身用户ip是否在这里面
    private List<String> ipLocations;
    // 查询结果中分身用户创建的罐头中是否包含指定内容
    private List<String> contents;

    /**
     * 判断真身罐头是否在要求的分类中
     *
     * @param yiguanDiaryVO
     * @return
     */
    public Boolean vaildateRealMoods(YiguanDiaryVO yiguanDiaryVO) {
        if (realQueryMoods == null) {
            return false;
        }
        return realQueryMoods.contains(yiguanDiaryVO.getMood());
    }

    /**
     * 判断分身罐头是否在要求的分类中
     *
     * @param yiguanDiaryVO
     * @return
     */
    public Boolean vaildateShadowMoods(YiguanDiaryVO yiguanDiaryVO) {
        if (shadowQueryMoods == null) {
            return false;
        }
        return shadowQueryMoods.contains(yiguanDiaryVO.getMood());
    }

    /**
     * 判断分身是否在要求的 ip 中
     *
     * @param yiguanDiaryVO
     * @return
     */
    public Boolean vaildateIp(YiguanDiaryVO yiguanDiaryVO) {
        if (ipLocations == null) {
            return false;
        }
        return ipLocations.get(0).equals("全部") || ipLocations.contains(yiguanDiaryVO.getIpLocation());
    }

    /**
     * 判断分身罐头的内容是否包含指定内容
     *
     * @param yiguanDiaryVO
     * @return
     */
    public Boolean vaildateContent(YiguanDiaryVO yiguanDiaryVO) {
        if (contents == null) {
            return false;
        }
        for (String content : contents) {
            if (yiguanDiaryVO.getText().contains(content)) {
                return true;
            }
        }
        return false;
    }
}
