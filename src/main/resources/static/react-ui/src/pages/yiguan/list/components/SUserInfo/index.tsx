import React, { useEffect } from 'react';
import { Tooltip, message, Tag } from 'antd';
import { SUser } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import UserDetail from '../UserDetail';
import AlbumDetail from '../AlbumDetail';
import { request } from '@umijs/max';
import { ModalForm, ProFormText, ProForm, ProFormTextArea } from '@ant-design/pro-components';

// const url = 'http://localhost:8001';
const url = '';


const SUserInfo: React.FC<{ sUser: SUser, trigger: JSX.Element, isInit: boolean }> = ({ sUser, trigger, isInit }) => {

    const [sUserDetail, setSUserDetail] = React.useState<SUser>();

    useEffect(() => {
        if (!isInit) {
            request(url + '/yiguan/getSUserById', {
                params: { 'uid': sUser.uid, },
                skipErrorHandler: true,
            }).then(function (res) {
                if (res.code == 1) {
                    setSUserDetail(res.data);
                } else {
                    message.error(res.message);
                }
            });
        } else {
            setSUserDetail(sUser);
        }
    }, []);

    const [selectedPhotos, setSelectedPhotos] = React.useState<string[]>([]);
    const handleChange = (photo: string, checked: boolean) => {
        const nextSelectedPhotos = checked
            ? [...selectedPhotos, photo]
            : selectedPhotos.filter((t) => t !== photo);
        setSelectedPhotos(nextSelectedPhotos);
    };

    function openChange(open: boolean) {
        if (open) {

        }
    }

    return (
        <>
            <ModalForm<SUser>
                title="详情"
                trigger={trigger}
                initialValues={{ diaryText: sUserDetail?.diaryText }}
                submitter={{
                    searchConfig: {
                        submitText: '添加',
                        resetText: '取消',
                    },
                }}
                onOpenChange={openChange}
                onFinish={async (values) => {
                    values.uid = sUser.uid;
                    values.albumIds = sUserDetail?.albumIds;
                    values.photos = selectedPhotos.join(",");
                    request(url + '/yiguan/addSUser', {
                        method: 'post',
                        data: values,
                        skipErrorHandler: true,
                    }).then(function (res) {
                        if (res.code == 1) {
                            message.success(`添加成功!`);
                            return true;
                        } else {
                            message.error(res.message);
                            return false;
                        }
                    });
                }}
            >
                <ProForm.Item label="用户 id">
                    {sUserDetail?.uid.split(',').map((uid, index) => (
                        <Tag bordered={false} color="green" key={index}>
                            <UserDetail userId={uid} title={uid} />
                        </Tag>
                    ))}
                </ProForm.Item>
                <ProForm.Item label="专辑 id">
                    {sUserDetail?.albumIds?.split(',').map((albumId, index) => (
                        <Tag bordered={false} color="green" key={index}>
                            <AlbumDetail
                                album={{
                                    id: albumId,
                                }}
                                title={albumId}
                            />
                        </Tag>
                    ))}
                </ProForm.Item>
                <ProFormTextArea width="xl" label="罐头内容" name="diaryText" />
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
