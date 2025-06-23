import type { ProColumns } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import type { Diary } from '../../../common/data';
import DiaryList from '../../../common/DiaryList';
import GenericTable from '../../../common/GenericTable';
import AlbumDetail from '../../../common/AlbumDetail';
import UserDetail from '../../../common/UserDetail';
import { Button, Modal, message } from 'antd';

interface album {
    albumId: string,
    title: string,
    uid: string,
    count: number,
    diaryNum: number,
    followNum: number,
    createTime: string,
}

interface Props {
    albumMap: Map<string, Diary[]>,
    setAlbumMap: (map: Map<string, Diary[]>) => void,
}

const AlbumList: React.FC<Props> = ({ albumMap, setAlbumMap }) => {

    const [albumList, setAlbumList] = useState<album[]>([]);
    const [diaryList, setDiaryList] = useState<Diary[]>([]);
    const [albumModal, setAlbumModal] = useState(false);
    const [albumDetailModal, setAlbumDetailModal] = useState(false);
    const [albumIndex, setAlbumIndex] = useState<number>(-1);

    const columns: ProColumns<album>[] = [
        {
            title: '#',
            dataIndex: 'index',
            render: (dom, album, index) => {
                return (
                    <>{index + 1}</>
                );
            },
            align: 'center',
            search: false,
            width: 70,
        },
        {
            title: '专辑',
            dataIndex: 'albumId',
            render: (dom, album) => {
                return (
                    <AlbumDetail album={{ id: album.albumId }} title={album.title} uid={album.uid} />
                );
            },
        },
        {
            title: '罐头数量',
            dataIndex: 'count',
            render: (dom, album, index) => {
                return (
                    <>
                        <a onClick={
                            () => {
                                const list = albumMap.get(album.albumId) || [];
                                if (list.length > 0) {
                                    setAlbumDetailModal(true);
                                    setDiaryList(list);
                                    setAlbumIndex(index);
                                } else {
                                    message.error("暂无罐头可查看~");
                                }
                            }
                        }>
                            {album.count}
                        </a>
                        <Modal
                            title={diaryList.length}
                            width={'80%'}
                            open={albumDetailModal}
                            onCancel={() => { setAlbumDetailModal(false); setDiaryList([]); setAlbumIndex(-1); }}
                            footer={[
                                <Button
                                    onClick={() => {
                                        if (albumIndex > -1) {
                                            if (albumIndex + 1 < albumList.length) {
                                                setDiaryList(albumMap.get(albumList[albumIndex + 1].albumId) || []);
                                            } else {
                                                setDiaryList([]);
                                                setAlbumDetailModal(false);
                                                setAlbumIndex(-1);
                                            }
                                            deleteAlbumList(albumList[albumIndex].albumId);
                                        } else {
                                            message.error('未设置 albumIndex ~');
                                        }
                                    }}
                                >
                                    下一个
                                </Button>,
                                <Button
                                    onClick={() => {
                                        setAlbumDetailModal(false);
                                        setDiaryList([]);
                                        deleteAlbumList(diaryList[0].album.id);
                                        setAlbumIndex(-1);
                                    }}
                                >
                                    清空
                                </Button>
                            ]}
                        >
                            <DiaryList
                                diaryList={diaryList}
                            />
                        </Modal>
                    </>
                );
            },
        },
        {
            title: '关注人数',
            dataIndex: 'followNum',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '罐头总数量',
            dataIndex: 'diaryNum',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (dom, album) => [
                <UserDetail userId={album.uid} title="真身" />,
                <a onClick={() => { deleteAlbumList(album.albumId); }}>
                    删除
                </a>,
            ],
        },
    ];

    const deleteAlbumList = (albumId: string) => {
        // 创建一个新的 Map 对象
        const newAlbumMap = new Map(albumMap);
        // 删除指定的键
        newAlbumMap.delete(albumId);
        // 更新状态
        setAlbumMap(newAlbumMap);
    };

    useEffect(() => {
        let albums: album[] = [];
        for (const [key, value] of albumMap) {
            console.log(value)
            albums.push({
                albumId: key,
                title: value[0].album.title || key,
                uid: value[0].user.id,
                count: value.length,
                diaryNum: value[value.length - 1].album.diaryNum || 0,
                followNum: value[value.length - 1].album.followNum || 0,
                createTime: value[0].album.createTime || '',
            })
        }
        setAlbumList(albums);
    }, [albumMap]);


    return (
        <>
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={() => { setAlbumModal(true) }}>
                匿名专辑
            </Button>
            <Modal
                title={'匿名专辑列表：' + albumList.length}
                width={'80%'}
                open={albumModal}
                onCancel={() => { setAlbumModal(false) }}
                footer={[
                    <Button onClick={() => { setAlbumMap(new Map()); }}>
                        清空
                    </Button>,
                ]}
            >
                <GenericTable<album>
                    data={albumList}
                    columns={columns}
                    rowKey='albumId'
                    toolBarRender={false}
                    initTableParams={{
                        search: false,
                        bordered: true,
                        virtual: true,
                        scroll: {
                            x: 140,
                            y: 500,
                        },
                    }}
                />
            </Modal>
        </>
    );
};

export default AlbumList;
