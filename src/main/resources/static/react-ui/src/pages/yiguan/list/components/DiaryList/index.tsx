import React, { useState, useEffect, ReactNode } from 'react';
import { UserOutlined } from '@ant-design/icons';
import {
    Button,
    Avatar,
    Tag,
    List,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { Diary, SUser } from '../../data';
import UserDetail from '../UserDetail';
import PhotoCarousel from '../PhotoCarousel';
import SUserInfo from '../SUserInfo';
import AlbumDetail from '../AlbumDetail';

const url = 'http://localhost:8001';
// const url = '';


const ContainerHeight = 700;

interface ListProps {
    diaryList: Diary[];
    removeDiaryList?: (count: number) => void;
}

const DiaryList: React.FC<ListProps> = ({ diaryList, removeDiaryList }) => {

    const getActions = (diary: Diary, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(<Tag>{diary.id}</Tag>);
        actions.push(<Tag>{diary.score}</Tag>);
        if (diary.album) {
            actions.push(<AlbumDetail album={diary.album} title={diary.album.title || '罐头专辑'} />);
        }
        if (diary.user.id) {
            actions.push(
                <SUserInfo
                    sUser={convertToSUser(diary)}
                    trigger={<Button >详情</Button>}
                    isInit={true}
                />
            );
        }
        if (removeDiaryList) {
            actions.push(<Button danger onClick={() => removeDiaryList(index + 1)}>删除</Button>);
        }
        return actions;
    };

    const convertToSUser = (diary: Diary): SUser => {
        const sUser: SUser = {
            uid: diary.user.id,
            diaryText: diary.text,
            photos: "",
        };
        if (diary.album) {
            sUser.albumIds = diary.album.id;
            if (diary.album.photo) {
                sUser.photos = diary.album.photo;
            }
        }
        diary.photos.map((photo: string) => sUser.photos += ',' + photo);
        if (sUser.photos?.charAt(0) == ',') {
            sUser.photos = sUser.photos.slice(1);
        }
        sUser.lastActiveTime = diary.score;
        return sUser;
    }


    return (
        <List itemLayout="vertical">
            <VirtualList
                data={diaryList}
                height={ContainerHeight}
                itemHeight={50}
                itemKey="id"
            // onScroll={onScroll}
            >
                {(diary: Diary, index) => (
                    <List.Item
                        key={diary.id}
                        actions={getActions(diary, index)}
                        extra={
                            <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
                                <PhotoCarousel photos={diary.photos} />
                            </div>
                        }
                    >
                        <List.Item.Meta
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
                        {diary.text}
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};

export default DiaryList;