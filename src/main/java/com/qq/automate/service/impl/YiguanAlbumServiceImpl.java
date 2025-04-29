package com.qq.automate.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qq.automate.common.model.PageResult;
import com.qq.automate.common.model.query.YiguanAlbumQuery;
import com.qq.automate.common.model.vo.YiguanAlbumVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.util.convert.YiguanAlbumConvert;
import com.qq.automate.entity.YiguanAlbum;
import com.qq.automate.mapper.YiguanAlbumMapper;
import com.qq.automate.service.YiguanAlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class YiguanAlbumServiceImpl extends ServiceImpl<YiguanAlbumMapper, YiguanAlbum> implements YiguanAlbumService {

    @Autowired
    private YiguanAlbumMapper yiguanAlbumMapper;
    @Autowired
    private YiguanAlbumConvert yiguanAlbumConvert;

    @Override
    public PageResult<YiguanAlbumVO> listAlbumsByUserIdPage(YiguanAlbumQuery query) {
        QueryWrapper<YiguanAlbum> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uid", query.getUid());
        Page<YiguanAlbum> page = query.toMpPage();
        this.page(page, queryWrapper);
        return PageResult.ofList(page, (List<YiguanAlbum> list) -> yiguanAlbumConvert.albumsToAlbumVOs(list));
    }

    @Override
    public Result insertOrUpdateAlbum(YiguanAlbum album) {
        return new Result().success(yiguanAlbumMapper.insertOrUpdate(album));
    }
}
