import React, { useEffect } from 'react';
import { Tooltip, message, Tag } from 'antd';
import { SUser } from '../data';
import PhotoCarousel from '../PhotoCarousel';
import UserDetail from '../UserDetail';
import AlbumDetail from '../AlbumDetail';
import { request } from '@umijs/max';
import {
    ModalForm,
    ProFormDateTimePicker,
    ProForm,
    ProFormTextArea,
} from '@ant-design/pro-components';

// const baseUrl = 'http://localhost:8001';
const baseUrl = '';

const diaryDetailUrl = 'https://api.jijigugu.club/diary/detail';

interface SUserProps {
    sUser?: SUser;
    trigger: JSX.Element;
    diaryId?: string;
    uid?: string;
}

const SUserInfo: React.FC<SUserProps> = ({ sUser, trigger, diaryId, uid }) => {

    const [sUserDetail, setSUserDetail] = React.useState<SUser>();

    useEffect(() => {
        if (sUser) {
            setSUserDetail(sUser);
            if (!uid) {
                uid = sUser.uid;
            }
        } else if (uid) {
            request(baseUrl + '/yiguan/getSUserById', {
                params: { 'uid': uid, },
                skipErrorHandler: true,
            }).then(function (res) {
                if (res.code == 1) {
                    setSelectedPhotos(res.data.photos?.split(','));
                    setSUserDetail(res.data);
                } else {
                    message.error(res.message);
                }
            });
        }
    }, []);

    const [selectedPhotos, setSelectedPhotos] = React.useState<string[]>([]);
    const handleChange = (photo: string, checked: boolean) => {
        const nextSelectedPhotos = checked
            ? [...selectedPhotos, photo]
            : selectedPhotos.filter((t) => t !== photo);
        setSelectedPhotos(nextSelectedPhotos);
    };

    const [ipLocation, setIpLocation] = React.useState<string>('详情');
    function openChange(open: boolean) {
        if (open) {
            if (diaryId) {
                request(diaryDetailUrl, {
                    params: { 'id': diaryId, },
                    skipErrorHandler: true,
                }).then(function (res) {
                    if (res.code == 0) {
                        if (res.data.ipLocation) {
                            setIpLocation(res.data.ipLocation);
                        }
                    } else {
                        message.error(res.msg);
                    }
                });
            }
        }
    }

    return (
        <>
            <ModalForm<SUser>
                title={ipLocation}
                trigger={trigger}
                initialValues={{
                    diaryText: sUserDetail?.diaryText,
                    lastActiveTime: sUserDetail?.lastActiveTime,
                }}
                submitter={{
                    searchConfig: {
                        submitText: diaryId ? '添加' : '更新',
                        resetText: '取消',
                    },
                }}
                onOpenChange={openChange}
                onFinish={async (values) => {
                    if (!uid) {
                        message.error('uid 不存在');
                        return;
                    }
                    values.uid = uid;
                    values.photos = selectedPhotos?.join(",");
                    values.albumIds = sUserDetail?.albumIds;
                    let code = 0;
                    let url;
                    if (diaryId) {
                        url = baseUrl + '/yiguan/addSUser';
                    } else {
                        url = baseUrl + '/yiguan/updateSUser';
                    }
                    await request(url, {
                        method: 'post',
                        data: values,
                        skipErrorHandler: true,
                    }).then(function (res) {
                        if (res.code == 1) {
                            message.success(diaryId ? '添加成功!' : '更新成功!');
                        } else {
                            message.error(res.message);
                        }
                        code = res.code;
                    });
                    if (code == 1) {
                        return true;
                    }
                    return false;
                }}
            >
                <ProForm.Item label="用户 id">
                    {sUserDetail?.uid?.split(',').map((uid, index) => (
                        <Tag bordered={false} color="green" key={index}>
                            <UserDetail userId={uid} title={uid} />
                        </Tag>
                    ))}
                </ProForm.Item>
                <ProForm.Item label="专辑" name="albumIdList">
                    {sUserDetail?.albumIds?.split(',').map((albumId, index) => (
                        <AlbumDetail album={{ id: albumId, }} title={albumId} uid={sUserDetail?.uid} />
                    ))}
                </ProForm.Item>
                <ProFormDateTimePicker name="lastActiveTime" label="最新活跃时间" />
                <ProFormTextArea fieldProps={{ rows: 5 }} label="罐头内容" name="diaryText" />
                <ProForm.Item label="图片">
                    {sUserDetail?.photos != '' && sUserDetail?.photos?.split(',').map((photo, index) => (
                        <Tooltip
                            key={index}
                            title={
                                <div style={{ width: '250px', height: '250px' }}>
                                    <PhotoCarousel photos={[photo]} />
                                </div>
                            }
                        >
                            <Tag.CheckableTag
                                className='ant-tag-success'
                                checked={selectedPhotos.includes(photo)}
                                onChange={(checked) => handleChange(photo, checked)}
                            >
                                {index}
                            </Tag.CheckableTag>
                        </Tooltip>
                    ))}
                </ProForm.Item>
            </ModalForm>
        </>
    );
};

export default SUserInfo;
