package com.qq.automate.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.qq.automate.common.model.PageQuery;
import com.qq.automate.common.model.PageResult;
import com.qq.automate.common.model.query.YiguanAlbumQuery;
import com.qq.automate.common.model.vo.YiguanAlbumVO;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanAlbum;

public interface YiguanAlbumService extends IService<YiguanAlbum> {

    Result insertOrUpdateAlbum(YiguanAlbum album);

    PageResult<YiguanAlbumVO> listAlbumsByUserIdPage(YiguanAlbumQuery query);
}
