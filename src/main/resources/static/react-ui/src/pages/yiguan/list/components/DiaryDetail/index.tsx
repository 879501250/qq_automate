import React, { useState, useEffect, ReactNode } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
    Button,
    Avatar,
    Tag,
    List,
    Input,
} from 'antd';
import { Diary } from '../../data';
import UserDetail from '../UserDetail';
import PhotoCarousel from '../PhotoCarousel';
import SUserInfo from '../SUserInfo';

interface DetailProps {
    diary: Diary;
    index: number;
    actions: React.ReactNode[] | undefined;
    enableMeta: boolean;
    photos?: string[];
}

const DiaryDetail: React.FC<DetailProps> = ({ diary, index, actions, enableMeta, photos }) => {

    return (
        <List.Item
            key={diary.id}
            actions={actions}
            extra={
                <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
                    <PhotoCarousel photos={photos ? photos : diary.photos} />
                </div>
            }
        >
            {enableMeta && <List.Item.Meta
                avatar={
                    <Avatar
                        src={diary.user.avatar || ''}
                        icon={!diary.user.avatar && <UserOutlined />}
                        size={64} />
                }
                title={
                    <div>
                        <UserDetail userId={diary.user.id} title={diary.user.nickname} />
                    </div>
                }
                description={
                    <span>
                        <Tag>#{index}</Tag>
                        {
                            diary.isSUser
                            &&
                            <SUserInfo
                                sUser={{ uid: diary.user.id }}
                                trigger={<Tag color="#f50">S</Tag>}
                                isInit={false}
                            />
                        }
                        <Tag>{diary.mood}</Tag>
                        {diary.user.age && <Tag>{diary.user.age}</Tag>}
                        {diary.ipLocation && <Tag>{diary.ipLocation}</Tag>}
                    </span>
                }
            />
            }
            <div style={{ whiteSpace: 'pre-line' }}>{diary.text}</div>
        </List.Item>
    );
};

export default DiaryDetail;