package com.qq.automate.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.qq.automate.common.result.Result;
import com.qq.automate.entity.YiguanSUser;
import com.qq.automate.mapper.YiguanSUserMapper;
import com.qq.automate.service.YiguanSUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
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
            putSUserCache(yiguanSUser);
        }
    }

    private void putSUserCache(YiguanSUser yiguanSUser) {
        // 可能出现一个人有多个账号的情况
        for (String uid : yiguanSUser.getUid().split(",")) {
            suserCache.put(uid, yiguanSUser);
        }
    }

    private YiguanSUser getSUser(String uid) {
        if (suserCache.isEmpty()) {
            initSUserCache();
        }
        return suserCache.get(uid);
    }

    @Override
    public Result addSUser(YiguanSUser yiguanSUser) {
        YiguanSUser sUser = getSUser(yiguanSUser.getUid());
        if (sUser == null) {
            sUser = yiguanSUser;
            suserCache.put(yiguanSUser.getUid(), sUser);
            try {
                yiguanSUserMapper.insert(yiguanSUser);
            } catch (Exception e) {
                e.printStackTrace();
                suserCache.remove(yiguanSUser.getUid());
                return Result.error().message("增加 SUser 失败：" + e.getMessage());
            }
        } else {
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
                    sUser.setDiaryText(diaryText + "&#10;&#10;&#10;" + yiguanSUser.getDiaryText());
                }
            }
            Result result = updateSUser(sUser);
            if (!result.getSuccess()) {
                return result;
            }
        }
        return Result.success().data("suser", sUser);
    }

    @Override
    public Result updateSUser(YiguanSUser yiguanSUser) {
        try {
            yiguanSUserMapper.updateById(yiguanSUser);
        } catch (Exception e) {
            e.printStackTrace();
            return Result.error().message("修改 SUser 失败：" + e.getMessage());
        }
        putSUserCache(yiguanSUser);
        return Result.success().data("suser", yiguanSUser);
    }

    /**
     * 从数据库中获取指定 suser 最新的信息放进缓存
     *
     * @param uid
     */
    private void updateSUserCache(String uid) {
        YiguanSUser yiguanSUser = yiguanSUserMapper.selectById(uid);
        putSUserCache(yiguanSUser);
    }

    @Override
    public Result isSUser(String uid) {
        return Result.success().data(getSUser(uid) != null);
    }

    @Override
    public Result getSUserById(String uid) {
        YiguanSUser sUser = getSUser(uid);
        if (sUser == null) {
            return Result.error().message("未找到用户[" + uid + "]~");
        }
        return Result.success().data(sUser);
    }

    @Override
    public Result updateSUserLastActiveTime(String uid, LocalDateTime lastActiveTime) {
        Result result = getSUserById(uid);
        if (result.getSuccess()) {
            YiguanSUser sUser = (YiguanSUser) result.getData();
            yiguanSUserMapper.updateLastActiveTime(sUser.getUid(), lastActiveTime);
            sUser.setLastActiveTime(lastActiveTime);
            result.message("更新成功~");
        }
        return result;
    }

    @Override
    public Result updateSUserAlbumIds(String uid, String albumId) {
        if (albumId == null || "".equals(albumId)) {
            return Result.error().message("非法的参数：albumId [" + albumId + "]");
        }
        Result result = getSUserById(uid);
        if (result.getSuccess()) {
            YiguanSUser sUser = (YiguanSUser) result.getData();
            String albumIds = sUser.getAlbumIds();
            boolean b = false;
            if (albumIds == null || "".equals(albumIds)) {
                albumIds = albumId;
                b = true;
            } else {
                if (!albumIds.contains(albumId)) {
                    albumIds += "," + albumId;
                    b = true;
                }
            }
            if (b) {
                yiguanSUserMapper.updateAlbumIds(sUser.getUid(), albumIds);
                sUser.setAlbumIds(albumIds);
                result.message("更新成功~");
            } else {
                result.message("专辑已添加~");
            }
        }
        return result;
    }

}
