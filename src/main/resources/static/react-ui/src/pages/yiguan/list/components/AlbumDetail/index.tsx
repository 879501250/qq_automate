import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal, Card, Tooltip, List, Tag, Col, Row, message } from 'antd';
import { Album, Diary } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';


const detailUrl = 'https://api.jijigugu.club/album/detail';
const listUrl = 'https://api.jijigugu.club/feed/listByAlbum';
const ContainerHeight = 400;

const AlbumDetail: React.FC<{ album: Album, title: string }> = ({ album, title }) => {


    const [open, setOpen] = useState(false);
    const showModal = () => {
        albumLastScore.current = null;
        if (albumDetail.photo) {
            setLoad(false);
        }
        appendData();
        setOpen(true);
    };
    const handleCancel = () => {
        setAlbums([]);
        setOpen(false);
    };

    function formatTimestamp(timestamp: number) {
        if (timestamp == 0) {
            return '未知';
        }
        const date = new Date(timestamp);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份是从0开始的  
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

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
        if (open && album.photo == undefined) {
            request(detailUrl, {
                params: { 'id': album.id },
                skipErrorHandler: true,
            }).then(function (res) {
                if (res.code == 0) {
                    setAlbumDetail(res.data);
                    setLoad(false);
                    album.photo = res.data.photo;
                } else {
                    message.error(res.msg);
                }
            });
        }
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
                <Button type="primary" onClick={showModal}>
                    {title}
                </Button>
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
                            {(diary: Diary) => (
                                <List.Item
                                    key={diary.id}
                                    actions={[<Tag>{diary.score}</Tag>]}
                                    extra={
                                        <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
                                            <PhotoCarousel photos={diary.photos.map((photo) => photo.url)} />
                                        </div>
                                    }
                                >
                                    <div>{diary.text}</div>
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </Card>
            </Modal>
        </>
    );
};

export default AlbumDetail;