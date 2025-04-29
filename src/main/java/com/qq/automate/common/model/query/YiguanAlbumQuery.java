package com.qq.automate.common.model.query;

import com.qq.automate.common.model.PageQuery;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serial;

@EqualsAndHashCode(callSuper = true)
@Data
public class YiguanAlbumQuery extends PageQuery {
    @Serial
    private static final long serialVersionUID = 7041984465816000438L;

    private String uid;
}
