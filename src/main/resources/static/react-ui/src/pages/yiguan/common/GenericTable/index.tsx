import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { request } from '@umijs/max';
import {
    FooterToolbar,
    ProTable,
} from '@ant-design/pro-components';
import { Button, GetProp, TableProps, message } from 'antd';
import React, { useRef, useState, useEffect } from 'react';
import type { TableListPagination, PageResult } from '../data';
import type { SorterResult } from 'antd/es/table/interface';
import type { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
    pagination?: TablePaginationConfig;
    sortField?: SorterResult<any>['field'];
    sortOrder?: SorterResult<any>['order'];
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

// 表格组件的 Props 类型
interface GenericTableProps<T> {
    columns: ProColumns<T>[],
    requestUrl?: string,
    data?: any[],
    title?: string,
    rowKey: string,
    initTableParams: TableParams,
    queryParams?: any,
    search?: false | SearchConfig | undefined,
    toolBarRender?: ((action: ActionType | undefined, rows: { selectedRowKeys?: (string | number)[] | undefined; selectedRows?: any[] | undefined; }) => React.ReactNode[]) | false;
}

const GenericTable = <T extends Record<string, any>>({
    columns,
    requestUrl,
    data,
    title,
    rowKey,
    initTableParams,
    queryParams,
    search,
    toolBarRender,
}: GenericTableProps<T>) => {
    const actionRef = useRef<ActionType>();
    const [selectedRowsState, setSelectedRows] = useState<T[]>([]);
    const [dataSource, setDataSource] = useState<T[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>(initTableParams);

    const fetchData = () => {
        setLoading(true);
        if (requestUrl) {
            const params = {
                pageNo: tableParams?.pagination?.current,
                pageSize: tableParams?.pagination?.pageSize,
                sortBy: tableParams.sortField,
                isAsc: tableParams.sortOrder == 'ascend'
            }
            request<PageResult>(requestUrl, {
                params: { ...queryParams, ...params },
                skipErrorHandler: true,
            }).then(function (res) {
                setDataSource(res.list);
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res.total,
                    },
                });
            });
        } else if (data) {
            setDataSource(data);
            setLoading(false);
        }
    };

    useEffect(fetchData, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        tableParams?.sortOrder,
        tableParams?.sortField,
        JSON.stringify(tableParams.filters),
        data,
    ]);

    const handleTableChange: TableProps<T>['onChange'] = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
            sortField: Array.isArray(sorter) ? undefined : sorter.columnKey,
        });
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    /**
     * 删除节点
     *
     * @param selectedRows
     */
    const handleRemove = async (selectedRows: T[]) => {
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

    return (
        <>
            <ProTable<any, TableListPagination>
                headerTitle={title}
                toolBarRender={toolBarRender}
                columnEmptyText={false}
                actionRef={actionRef}
                rowKey={rowKey}
                search={search}
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
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
        </>
    );
};

export default GenericTable;
