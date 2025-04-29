import type { ActionType, ProColumns } from '@ant-design/pro-components';
import React, { useRef, useState } from 'react';
import type { SUser } from '../common/data';
import UserDetail from '../common/UserDetail';
import SUserInfo from '../common/SUserInfo';
import GenericTable from '../common/GenericTable';

const SUserList: React.FC = () => {

    const columns: ProColumns<SUser>[] = [
        {
            title: '用户id',
            dataIndex: 'uid',
            render: (dom, entity) => {
                return (
                    entity.uid.split(',').map((uid, index) => (
                        <>
                            {index > 0 ? '、' : ''}
                            <UserDetail userId={uid} title={uid} />
                        </>
                    ))
                );
            },
            ellipsis: true,
            width: '20%',
        },
        {
            title: '描述',
            dataIndex: 'diaryText',
            valueType: 'textarea',
            ellipsis: true,
            width: '45%',
        },
        {
            title: '图片',
            dataIndex: 'photos',
            render: (dom, entity) => {
                return getPhohosNum(entity.photos);
            },
            width: '5%',
        },
        {
            title: '上次活跃时间',
            dataIndex: 'lastActiveTime',
            width: '15%',
            defaultSortOrder: 'descend',
            sorter: true,
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (dom, entity) => [
                <SUserInfo
                    sUser={entity}
                    trigger={<a>详情</a>}
                />,
                <a>
                    删除
                </a>,
            ],
            width: '10%',
        },
    ];

    function getPhohosNum(photos?: string) {
        if (photos == null) {
            return 0;
        }
        return photos.split(",").length;
    }

    return (
        <>
            <GenericTable<SUser>
                columns={columns}
                url='/yiguan/listSUsersPage'
                title='SUser 表格'
                rowKey='uid'
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
        </>
    );
};

export default SUserList;
