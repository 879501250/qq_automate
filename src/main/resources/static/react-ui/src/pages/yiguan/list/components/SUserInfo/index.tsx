import React, { useState, useEffect, ReactNode } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col, Row, Tooltip, message } from 'antd';
import { Diary } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import { ModalForm, ProFormText, ProForm, ProFormTextArea, ProFormCheckbox } from '@ant-design/pro-components';

const url = '';

type SUserType = {
    uid: string;
    albumIds: string;
    diaryText: string;
    photoList: string[];
    photos: string;
};

const SUserInfo: React.FC<{ diary: Diary }> = ({ diary }) => {

    const [form] = Form.useForm<SUserType>();

    const userDetailClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, diary: Diary) => {
        form.setFieldsValue({
            uid: diary.user.id,
            diaryText: diary.text,
            albumIds: diary.album ? diary.album.id : ""
        });
    };


    function getCheckBoxOptions(diary: Diary): { label: ReactNode, value: string }[] | undefined {
        let photos: string[] = [];
        if (diary.album) {
            photos.push(diary.album.photo);
        }
        if (diary.photos) {
            photos = photos.concat(diary.photos);
        }
        return photos ? photos.map((photo, index) => (
            {
                label:
                    <Tooltip
                        title={
                            <div style={{ width: '300px', height: '250px' }}>
                                <PhotoCarousel photos={[photo]} />
                            </div>
                        }
                    >
                        <span>{index}</span>
                    </Tooltip>,
                value: photo,
            }
        )) : undefined;
    }

    return (
        <>
            <ModalForm<SUserType>
                title="详情"
                trigger={<Button onClick={(event) => userDetailClick(event, diary)}>详情</Button>}
                form={form}
                submitter={{
                    searchConfig: {
                        submitText: '添加',
                        resetText: '取消',
                    },
                }}
                onFinish={async (values) => {
                    values.photos = values.photoList ? values.photoList.join(",") : "";
                    request(url + '/yiguan/addSUser', {
                        method: 'post',
                        data: values,
                        skipErrorHandler: true,
                    }).then(function (res) {
                        if (res.code == 1) {
                            console.log(res.data);
                            message.success(`添加成功!`);
                            return true;
                        }
                        return false;
                    });
                    return false;
                }}
            >
                <ProForm.Group>
                    <ProFormText
                        width="md"
                        name="uid"
                        label="用户 id"
                    />

                    <ProFormText
                        width="md"
                        name="albumIds"
                        label="专辑 id"
                    />
                </ProForm.Group>
                <ProFormTextArea width="xl" label="罐头内容" name="diaryText" />
                <ProFormCheckbox.Group name="photoList" label="图片" options={getCheckBoxOptions(diary)} />
            </ModalForm>
        </>
    );
};

export default SUserInfo;