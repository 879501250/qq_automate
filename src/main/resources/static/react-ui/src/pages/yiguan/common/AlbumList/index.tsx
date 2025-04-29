import type { ProColumns } from '@ant-design/pro-components';
import React, { useState, useEffect } from 'react';
import { Modal, Card, Tooltip, Tag, message } from 'antd';
import { request } from '@umijs/max';
import AlbumDetail from '../AlbumDetail';
import { Album } from '../data';
import GenericTable from '../GenericTable';

// type Album = {
//     albumId: string;
//     uid: string;
//     updateTime: string;
//     createTime: string;
// }

const AlbumList: React.FC<{ uid: string }> = ({ uid }) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const columns: ProColumns<Album>[] = [
        {
            title: '专辑id',
            dataIndex: 'id',
            render: (dom, entity) => {
                return (
                    <AlbumDetail album={{ id: entity.id, }} title={entity.title || entity.id} uid={uid} />
                );
            },
        },
        {
            title: '关注人数',
            dataIndex: 'followNum',
        },
        {
            title: '罐头数量',
            dataIndex: 'diaryNum',
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            defaultSortOrder: 'descend',
            sorter: true,
            key: 'update_time',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
    ];

    return (
        <>
            <a onClick={showModal}>
                {uid}
            </a>
            <Modal
                width={'80%'}
                open={open}
                title='专辑列表'
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <></>
                )}
            >
                <Card
                    style={{ marginTop: 5 }}
                    bordered={false}
                >
                    <GenericTable<Album>
                        columns={columns}
                        url='/yiguan/listAlbumsByUserIdPage'
                        title='SUser 表格'
                        rowKey='uid'
                        search={false}
                        toolBarRender={false}
                        initTableParams={{
                            pagination: {
                                current: 1,
                                pageSize: 15,
                            },
                            sortField: 'update_time',
                            sortOrder: 'descend',
                        }}
                        queryParams={{
                            uid: uid
                        }}
                    />
                </Card>
            </Modal>
        </>
    );
};

export default AlbumList;