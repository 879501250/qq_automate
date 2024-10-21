import React, { useState, useRef } from 'react';
import { useModel } from 'umi';
import { Tooltip, Avatar, Modal, Card, message, List, Tag, Col, Row, Button, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { SUser, Diary } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';
import AlbumDetail from '../AlbumDetail';
import DiaryDetail from '../DiaryDetail';
import SUserInfo from '../SUserInfo';
import CommentList from '../CommentList';
import { followedDirays, formatTimestamp } from '../../service';

type UserInfo = {
    id: string;
    nickname: string;
    gender: string;
    birthday: string;
    constellation: string;
    avatar: photo;
    bgImg: photo;
    city: string;
    emotionTag: {
        id: string;
        name: string;
    }
    followNum: number;
    followedNum: number;
    giftedCloverNum: number;
    realDiaryNum: number;
    desc: string[];
    isBanned: boolean;
    interactUseReal: boolean;
    uid: number;
    ipLocation: string;
};

type photo = {
    key: string;
    width: number;
    height: number;
    hash: any;
}

// const baseUrl = 'http://localhost:8001';
const baseUrl = '';


const detailUrl = 'https://api.jijigugu.club/realProfile/get';
const listUrl = 'https://api.jijigugu.club/diary/listByRealProfile';
const photoUrl = 'http://photo.pcdn.jijigugu.club/';
const ContainerHeight = 400;

const { Meta } = Card;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const UserDetail: React.FC<{ userId: string, title: string }> = ({ userId, title }) => {

    const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');

    const [open, setOpen] = useState(false);
    const showModal = () => {
        userLastScore.current = null;
        init();
        setOpen(true);
    };
    const handleCancel = () => {
        setData([]);
        setOpen(false);
    };

    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [load, setLoad] = useState<boolean>(true);
    const [s, setS] = useState<boolean>(false);
    function init() {
        setData([]);
        request(detailUrl, {
            params: { 'id': userId },
            headers: { 'ygt': initialState?.yiguanYgt || "" },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 0) {
                setUserInfo(res.data);
                isSUser(userId);
                setLoad(false);
                appendData();
            } else if (res.code == 8) {
                if (res.msg == "真身不存在") {
                    message.info("该用户还未开通真身~")
                }
            } else if (res.code == 2) {
                initialState?.refreshYiguanYgt?.().then(function (ygt) {
                    if (ygt) {
                        setInitialState((preInitialState) => ({
                            ...preInitialState, yiguanYgt: ygt
                        }));
                        message.info("登录凭证过期，请重新打开查看~")
                    } else {
                        message.error("登录凭证过期，获取失败~")
                    }
                });
            }
        });
    }

    function isSUser(uid: string) {
        request(baseUrl + "/yiguan/isSUser", {
            params: { 'uid': uid },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 1) {
                setS(res.data);
            } else {
                message.error(res.message);
            }
        });
    }

    const [data, setData] = useState<Diary[]>([]);
    const userLastScore: any = useRef();
    const appendData = () => {
        request(listUrl, {
            params: { 'uid': userId, 'lastScore': userLastScore.current, },
            headers: { 'ygt': initialState?.yiguanYgt || "" },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 0) {
                if (res.lastScore) {
                    userLastScore.current = res.lastScore;
                    setData(data.concat(res.data));
                }
            }
        });
    };

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };

    const getActions = (diary: Diary, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.id}</Tag>);
        actions.push(<Tag color='white' style={{ color: 'black' }}>{formatTimestamp(diary.createTime * 1000)}</Tag>);
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.mood.name}</Tag>);
        actions.push(
            <a
                style={{ color: 'inherit' }}
                onClick={() => { followedDirays.add(diary); }}
            >
                {React.createElement(StarOutlined)}
            </a>
        );
        actions.push(
            <IconText
                icon={LikeOutlined}
                text={diary.likedNum ? '' + diary.likedNum : '0'}
                key="list-vertical-like-o"
            />
        );
        if (diary.isCommentOpen) {
            actions.push(
                <CommentList did={diary.id}
                    tigger={
                        <IconText
                            icon={MessageOutlined}
                            text={diary.commentedNum ? '' + diary.commentedNum : '0'}
                            key="list-vertical-message"
                        />
                    }
                />);
        }
        if (diary.album) {
            actions.push(
                <AlbumDetail album={diary.album} title={diary.album.title || "罐头专辑"} uid={diary.user.id} />
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
        diary.photos.map((photo: any) => sUser.photos += ',' + photo.url);
        if (sUser.photos?.charAt(0) == ',') {
            sUser.photos = sUser.photos.slice(1);
        }
        return sUser;
    }

    if (!userId) {
        return <>{title}</>
    }

    return (
        <>
            <a onClick={showModal}>
                {title}
            </a>
            <Modal
                width={'80%'}
                open={open}
                title={
                    <Tooltip
                        title={
                            userInfo?.bgImg &&
                            <div style={{ width: '250px', height: '250px' }}>
                                <PhotoCarousel photos={[photoUrl + userInfo?.bgImg.key]} />
                            </div>
                        }
                    >
                        {userInfo?.nickname}
                    </Tooltip>
                }
                onCancel={handleCancel}

                footer={(_, { OkBtn, CancelBtn }) => (
                    <></>
                )}
            >
                <Card loading={load} bordered={false} >
                    <Row>
                        <Col flex={4}>
                            <Avatar src={photoUrl + userInfo?.avatar.key} size={120} />
                        </Col>
                        <Col flex={10}>
                            <div>
                                <p>用户 id：{userInfo?.id}</p>
                                <p>生日：{userInfo?.birthday}</p>
                                <p>关注真身：{userInfo?.followNum}</p>
                                <p>ip：{userInfo?.ipLocation}</p>
                            </div>
                        </Col>
                        <Col flex={10}>
                            <div>
                                <p>罐头数量：{userInfo?.realDiaryNum}</p>
                                <p>星座：{userInfo?.constellation}</p>
                                <p>粉丝：{userInfo?.followedNum}</p>
                                {
                                    s
                                    &&
                                    <SUserInfo
                                        sUser={{ uid: userId }}
                                        trigger={<Tag color="#f50">S</Tag>}
                                        isInit={false}
                                    />
                                }
                            </div>
                        </Col>
                    </Row>

                </Card>
                <Card
                    style={{ marginTop: 5 }}
                    bordered={false}
                >
                    <List itemLayout="vertical">
                        <VirtualList
                            data={data}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="id"
                            onScroll={onScroll}
                        >
                            {(diary: Diary, index) => (
                                <div>
                                    <DiaryDetail
                                        diary={diary}
                                        index={index}
                                        actions={getActions(diary, index)}
                                        enableMeta={false}
                                        photos={diary.photos.map((photo) => photo.url)}
                                    />
                                </div>
                            )}
                        </VirtualList>
                    </List>
                </Card>
            </Modal>
        </>
    );
};

export default UserDetail;
