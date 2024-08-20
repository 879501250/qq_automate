package com.qq.automate.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;
import com.qq.automate.mapper.YiguanSUserMapper;
import com.qq.automate.service.YiguanSUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class YiguanSUserServiceImpl extends ServiceImpl<YiguanSUserMapper, YiguanSUser> implements YiguanSUserService {
    @Autowired
    private YiguanSUserMapper yiguanSUserMapper;

    private static Map<String, YiguanSUser> suserCache = new HashMap<>();

    @Override
    public Result listSUsers() {
        return Result.success().data("susers", yiguanSUserMapper.listAll());
    }

    private void initSUserCache() {
        for (YiguanSUser yiguanSUser : yiguanSUserMapper.listAll()) {
            suserCache.put(yiguanSUser.getUid(), yiguanSUser);
        }
    }

    @Override
    public Result addSUser(YiguanSUser yiguanSUser) {
        if (suserCache.isEmpty()) {
            initSUserCache();
        }
        YiguanSUser sUser = suserCache.get(yiguanSUser.getUid());
        if (sUser == null) {
            sUser = yiguanSUser;
            suserCache.put(yiguanSUser.getUid(), sUser);
            yiguanSUserMapper.insert(yiguanSUser);
        } else {
            // 添加专辑 id
            String albumIds = sUser.getAlbumIds();
            if (albumIds == null || albumIds.isEmpty()) {
                sUser.setAlbumIds(yiguanSUser.getAlbumIds());
            } else {
                if (yiguanSUser.getAlbumIds() != null && !albumIds.contains(yiguanSUser.getAlbumIds())) {
                    sUser.setAlbumIds(albumIds + "," + yiguanSUser.getAlbumIds());
                }
            }
            // 添加图片
            String photos = sUser.getPhotos();
            if (photos == null || photos.isEmpty()) {
                sUser.setPhotos(yiguanSUser.getPhotos());
            } else {
                if (yiguanSUser.getPhotos() != null) {
                    for (String s : yiguanSUser.getPhotos().split(",")) {
                        if (!s.isEmpty() && !photos.contains(s)) {
                            photos += "," + s;
                        }
                    }
                    sUser.setPhotos(photos);
                }
            }
            // 添加罐头内容
            String diaryText = sUser.getDiaryText();
            if (diaryText == null || diaryText.isEmpty()) {
                sUser.setDiaryText(yiguanSUser.getDiaryText());
            } else {
                if (yiguanSUser.getDiaryText() != null && !yiguanSUser.getDiaryText().isEmpty()) {
                    sUser.setDiaryText(diaryText + "\n" + yiguanSUser.getDiaryText());
                }
            }
            yiguanSUserMapper.updateById(sUser);
        }
        return Result.success().data("suser", sUser);
    }

}
