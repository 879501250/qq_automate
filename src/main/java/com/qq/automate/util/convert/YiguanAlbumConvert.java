package com.qq.automate.util.convert;

import com.qq.automate.common.model.vo.YiguanAlbumVO;
import com.qq.automate.entity.YiguanAlbum;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;
import org.mapstruct.Mappings;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING) // 指定生成的实现类集成 Spring
public interface YiguanAlbumConvert {
    List<YiguanAlbumVO> albumsToAlbumVOs(List<YiguanAlbum> album);

    @Mappings({
            @Mapping(source = "albumId", target = "id"),
            @Mapping(source = "albumTitle", target = "title")
    })
    YiguanAlbumVO albumToAlbumVO(YiguanAlbum album);
}
