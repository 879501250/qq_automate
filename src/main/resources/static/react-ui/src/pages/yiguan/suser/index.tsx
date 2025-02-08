import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import {
    FooterToolbar,
    ProTable,
} from '@ant-design/pro-components';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { SUser, TableListPagination, Result } from '../common/data';
import UserDetail from '../common/UserDetail';
import SUserInfo from '../common/SUserInfo';

// const url = 'http://localhost:8001';
const url = '';

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: SUser[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;

    try {
        // await removeRule({
        //   key: selectedRows.map((row) => row.uid),
        // });
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const SUserList: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<SUser[]>([]);

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
            sorter: (a, b) => getPhohosNum(a.photos) - getPhohosNum(b.photos),
        },
        {
            title: '上次活跃时间',
            dataIndex: 'lastActiveTime',
            width: '15%',
            sorter: (a, b) => new Date(a.lastActiveTime || 0).getTime() - new Date(b.lastActiveTime || 0).getTime(),
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
            <ProTable<SUser, TableListPagination>
                headerTitle="查询表格"
                columnEmptyText={false}
                actionRef={actionRef}
                rowKey="uid"
                search={{
                    labelWidth: 120,
                }}
                request={async (
                    // 第一个参数 params 查询表单和 params 参数的结合
                    // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
                    params: {
                        pageSize: number;
                        current: number;
                    },
                    sort,
                    filter,
                ) => {
                    console.log(params);
                    console.log(sort);
                    console.log(filter);
                    // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const msg = await request<Result>(url + '/yiguan/listSUsers', {
                        // params: { 'uid': sUser.uid, },
                        skipErrorHandler: true,
                    });
                    return {
                        data: msg.data.susers,
                        // success 请返回 true，
                        // 不然 table 会停止解析数据，即使有数据
                        success: msg.success,
                        // 不传会使用 data 的长度，如果是分页一定要传
                        // total: number,
                    };
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => {
                        setSelectedRows(selectedRows);
                    },
                }}
            />
            {selectedRowsState?.length > 0 && (
                <FooterToolbar
                    extra={
                        <div>
                            已选择{' '}
                            <a
                                style={{
                                    fontWeight: 600,
                                }}
                            >
                                {selectedRowsState.length}
                            </a>{' '}
                            项
                        </div>
                    }
                >
                    <Button
                        onClick={async () => {
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
                            actionRef.current?.reloadAndRest?.();
                        }}
                    >
                        批量删除
                    </Button>
                </FooterToolbar>
            )}

            {/* <Drawer
                width={600}
                open={showDetail}
                onClose={() => {
                    setCurrentRow(undefined);
                    setShowDetail(false);
                }}
                closable={false}
            >
                {currentRow?.name && (
                    <ProDescriptions<TableListItem>
                        column={2}
                        title={currentRow?.name}
                        request={async () => ({
                            data: currentRow || {},
                        })}
                        params={{
                            id: currentRow?.name,
                        }}
                        columns={columns as ProDescriptionsItemProps<TableListItem>[]}
                    />
                )}
            </Drawer> */}
        </>
    );
};

export default SUserList;
