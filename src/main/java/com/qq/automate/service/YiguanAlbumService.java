package com.qq.automate.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanAlbum;

public interface YiguanAlbumService extends IService<YiguanAlbum> {

    Result listAlbumsByUserId(String uid);

    Result insertOrUpdateAlbum(YiguanAlbum album);
}
