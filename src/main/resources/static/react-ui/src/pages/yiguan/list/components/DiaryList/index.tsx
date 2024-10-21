import React, { useState, useEffect, ReactNode } from 'react';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';
import {
    Button,
    Avatar,
    Tag,
    List,
    Input,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { Diary, SUser } from '../../data';
import SUserInfo from '../SUserInfo';
import AlbumDetail from '../AlbumDetail';
import DiaryDetail from '../DiaryDetail';
import CommentList from '../CommentList';
import { followedDirays } from '../../service';

// const url = 'http://localhost:8001';
const url = '';

const { TextArea } = Input;


const ContainerHeight = 700;

interface ListProps {
    diaryList: Diary[];
    removeDiaryList?: (count: number) => void;
}

const DiaryList: React.FC<ListProps> = ({ diaryList, removeDiaryList }) => {

    const getActions = (diary: Diary, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.id}</Tag>);
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.score}</Tag>);
        actions.push(
            <a
                style={{ color: 'inherit' }}
                onClick={() => { followedDirays.add(diary);console.log(followedDirays) }}
            >
                {React.createElement(StarOutlined)}
            </a>
        );
        if (diary.isCommentOpen) {
            actions.push(<CommentList did={diary.id} tigger={React.createElement(MessageOutlined)} />);
        }
        if (diary.album) {
            actions.push(
                <AlbumDetail album={diary.album} title={diary.album.title || '罐头专辑'} uid={diary.user.id} />
            );
        }
        if (diary.user.id) {
            actions.push(
                <SUserInfo
                    sUser={convertToSUser(diary)}
                    trigger={<Button>详情</Button>}
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
                    <div>
                        <DiaryDetail
                            diary={diary}
                            index={index}
                            actions={getActions(diary, index)}
                            enableMeta={true}
                        />
                    </div>
                )}
            </VirtualList>
        </List>
    );
};

export default DiaryList;