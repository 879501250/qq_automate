package com.qq.automate.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qq.automate.common.result.Result;
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

    @Override
    public Result listAlbumsByUserId(String uid) {
        QueryWrapper<YiguanAlbum> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("uid", uid);
        List<YiguanAlbum> yiguanAlbums = yiguanAlbumMapper.selectList(queryWrapper);
        return Result.success().data(yiguanAlbums);
    }

    @Override
    public Result insertOrUpdateAlbum(YiguanAlbum album) {
        return new Result().success(yiguanAlbumMapper.insertOrUpdate(album));
    }
}
