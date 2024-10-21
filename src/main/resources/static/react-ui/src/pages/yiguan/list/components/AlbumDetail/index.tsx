import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Card, Tooltip, List, Tag, Col, Row, message, Space } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Album, Diary, SUser } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';
import DiaryDetail from '../DiaryDetail';
import SUserInfo from '../SUserInfo';
import CommentList from '../CommentList';
import { followedDirays, formatTimestamp } from '../../service';


const detailUrl = 'https://api.jijigugu.club/album/detail';
const listUrl = 'https://api.jijigugu.club/feed/listByAlbum';
const ContainerHeight = 400;

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const AlbumDetail: React.FC<{ album: Album, title: string, uid: string }> = ({ album, title, uid }) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        albumLastScore.current = null;
        appendData();
        setOpen(true);
    };
    const handleCancel = () => {
        setAlbums([]);
        setOpen(false);
    };

    const [albums, setAlbums] = useState<Diary[]>([]);
    const albumLastScore: any = useRef();
    const appendData = () => {
        request(listUrl, {
            params: { 'albumId': album.id, 'lastScore': albumLastScore.current, },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 0) {
                if (res.lastScore) {
                    albumLastScore.current = res.lastScore;
                    setAlbums(albums.concat(res.data));
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

    const [albumDetail, setAlbumDetail] = useState<Album>(album);
    const [load, setLoad] = useState<boolean>(true);
    function openChange(open: boolean) {
        if (open) {
            if (album.photo == undefined || album.diaryNum == undefined) {
                request(detailUrl, {
                    params: { 'id': album.id },
                    skipErrorHandler: true,
                }).then(function (res) {
                    if (res.code == 0) {
                        setAlbumDetail(res.data);
                        album.photo = res.data.photo;
                        setLoad(false);
                    } else {
                        message.error(res.msg);
                    }
                });
            } else {
                setLoad(false);
            }
        }
    }

    const getActions = (diary: Diary, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.id}</Tag>);
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.score}</Tag>);
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
        actions.push(
            <SUserInfo
                sUser={convertToSUser(diary)}
                trigger={<Button>详情</Button>}
                isInit={true}
            />
        );
        return actions;
    };

    const convertToSUser = (diary: Diary): SUser => {
        const sUser: SUser = {
            uid: diary.user.id || uid,
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


    return (
        <>
            <Tooltip
                title={
                    <div style={{ width: '250px', height: '250px' }}>
                        <PhotoCarousel photos={[album.photo]} />
                    </div>
                }
                onOpenChange={openChange}
                fresh={true}
            >
                {/* <Button type="primary" onClick={showModal}>
                    {title}
                </Button> */}
                <Tag color="#108ee9" onClick={showModal}>
                    {title}
                </Tag>
            </Tooltip>
            <Modal
                width={'80%'}
                open={open}
                title={
                    <Tooltip
                        title={
                            <div style={{ width: '250px', height: '250px' }}>
                                <PhotoCarousel photos={[album.photo]} />
                            </div>
                        }
                    >
                        {albumDetail.title}
                    </Tooltip>
                }
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <></>
                )}
            >
                <Card loading={load} bordered={false}>
                    <Row>
                        <Col flex={5}>
                            <div>
                                <p>专辑 id：{albumDetail.id}</p>
                                <p>关注人数：{albumDetail.followNum}</p>
                            </div>
                        </Col>
                        <Col flex={5}>
                            <div>
                                <p>罐头数量：{albumDetail.diaryNum}</p>
                                <p>创建时间：{formatTimestamp(albumDetail.createTime || 0)}</p>
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
                            data={albums}
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

export default AlbumDetail;