import type { ProColumns } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import type { Diary } from '../../../common/data';
import DiaryList from '../../../common/DiaryList';
import GenericTable from '../../../common/GenericTable';
import SUserInfo from '../../../common/SUserInfo';
import UserDetail from '../../../common/UserDetail';
import { Button, Modal, message } from 'antd';

interface suser {
    uid: string,
    name: string,
    count: number;
}

interface Props {
    suserMap: Map<string, Diary[]>,
    setSUserMap: (map: Map<string, Diary[]>) => void,
}

const SUserList: React.FC<Props> = ({ suserMap, setSUserMap }) => {

    const [suserList, setSuserList] = useState<suser[]>([]);
    const [diaryList, setDiaryList] = useState<Diary[]>([]);
    const [suserModal, setSUserModal] = useState(false);
    const [suserDetailModal, setSuserDetailModal] = useState(false);

    const columns: ProColumns<suser>[] = [
        {
            title: 'suser',
            dataIndex: 'albumId',
            render: (dom, suser) => {
                return (
                    <SUserInfo
                        uid={suser.uid}
                        trigger={<a>{suser.name}</a>}
                    />
                );
            },
            width: '40%',
        },
        {
            title: '罐头数量',
            dataIndex: 'count',
            render: (dom, suser) => {
                return (
                    <>
                        <a onClick={
                            () => {
                                const list = suserMap.get(suser.uid) || [];
                                if (list.length > 0) {
                                    setSuserDetailModal(true);
                                    setDiaryList(list);
                                } else {
                                    message.error("暂无罐头可查看~");
                                }
                            }
                        }>
                            {suser.count}
                        </a>
                        <Modal
                            title={diaryList.length}
                            width={'80%'}
                            open={suserDetailModal}
                            onCancel={() => { setSuserDetailModal(false); setDiaryList([]); }}
                            footer={[
                                <Button
                                    onClick={() => {
                                        setSuserDetailModal(false);
                                        setDiaryList([]);
                                        deleteSUserList(diaryList[0].user.id);
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
            render: (dom, suser) => [
                <UserDetail userId={suser.uid} title="真身" />,
                <a onClick={() => { deleteSUserList(suser.uid); }}>
                    删除
                </a>,
            ],
            width: '20%',
        },
    ];

    const deleteSUserList = (uid: string) => {
        // 创建一个新的 Map 对象
        const newSUserMap = new Map(suserMap);
        // 删除指定的键
        newSUserMap.delete(uid);
        // 更新状态
        setSUserMap(newSUserMap);
    };

    useEffect(() => {
        let susers: suser[] = [];
        for (const [key, value] of suserMap) {
            susers.push({
                uid: key,
                name: value[0].user.nickname || key,
                count: value.length,
            })
        }
        setSuserList(susers);
    }, [suserMap]);


    return (
        <>
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={() => { setSUserModal(true) }}>
                S
            </Button>
            <Modal
                // title={albumList.length}
                width={'80%'}
                open={suserModal}
                onCancel={() => { setSUserModal(false) }}
                footer={[
                    <Button onClick={() => { setSUserMap(new Map()); }}>
                        清空
                    </Button>,
                ]}
            >
                <GenericTable<suser>
                    data={suserList}
                    columns={columns}
                    rowKey='uid'
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

export default SUserList;
