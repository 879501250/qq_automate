import React from 'react';
import { MessageOutlined, StarOutlined } from '@ant-design/icons';
import {
    Button,
    Tag,
    List,
    Input,
    Avatar,
} from 'antd';
import VirtualList from 'rc-virtual-list';
import { UserOutlined } from '@ant-design/icons';
import { Diary, SUser } from '../data';
import SUserInfo from '../SUserInfo';
import AlbumDetail from '../AlbumDetail';
import DiaryDetail from '../DiaryDetail';
import CommentList from '../CommentList';
import { followedDirays } from '../service';
import UserDetail from '../UserDetail';

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
                onClick={() => { followedDirays.add(diary); console.log(followedDirays) }}
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
                    diaryId={diary.id}
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
                            metaData={<List.Item.Meta
                                avatar={
                                    diary.user.avatar ?
                                        <Avatar
                                            src={diary.user.avatar}
                                            size={64} />
                                        :
                                        <Avatar
                                            icon={<UserOutlined />}
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
                                                uid={diary.user.id}
                                                trigger={<Tag color="#f50">S</Tag>}
                                            />
                                        }
                                        <Tag>{diary.mood}</Tag>
                                        {diary.user.age && <Tag>{diary.user.age}</Tag>}
                                        {diary.ipLocation && <Tag>{diary.ipLocation}</Tag>}
                                    </span>
                                }
                            />}
                        />
                    </div>
                )}
            </VirtualList>
        </List>
    );
};

export default DiaryList;