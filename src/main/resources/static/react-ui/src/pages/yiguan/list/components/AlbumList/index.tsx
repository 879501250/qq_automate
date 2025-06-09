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
    count: number;
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

    const columns: ProColumns<album>[] = [
        {
            title: '专辑',
            dataIndex: 'albumId',
            render: (dom, album) => {
                return (
                    <AlbumDetail album={{ id: album.albumId }} title={album.title} uid={album.uid} />
                );
            },
            width: '40%',
        },
        {
            title: '罐头数量',
            dataIndex: 'count',
            render: (dom, album) => {
                return (
                    <>
                        <a onClick={
                            () => {
                                const list = albumMap.get(album.albumId) || [];
                                if (list.length > 0) {
                                    setAlbumDetailModal(true);
                                    setDiaryList(list);
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
                            onCancel={() => { setAlbumDetailModal(false); setDiaryList([]); }}
                            footer={[
                                <Button
                                    onClick={() => {
                                        setAlbumDetailModal(false);
                                        setDiaryList([]);
                                        deleteAlbumList(diaryList[0].album.id);
                                    }}
                                >
                                    清空
                                </Button>,
                            ]}
                        >
                            <DiaryList
                                diaryList={diaryList}
                            />
                        </Modal>
                    </>
                );
            },
            width: '40%',
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
            width: '20%',
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
            albums.push({
                albumId: key,
                title: value[0].album.title || key,
                uid: value[0].user.id,
                count: value.length,
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
                // title={albumList.length}
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
                    search={false}
                    toolBarRender={false}
                    initTableParams={{
                        pagination: {
                            current: 1,
                            pageSize: 15,
                        },
                        sortField: 'lastActiveTime',
                        sortOrder: 'descend',
                    }}
                />
            </Modal>
        </>
    );
};

export default AlbumList;
