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
    const [suserIndex, setSUserIndex] = useState<number>(-1);

    const columns: ProColumns<suser>[] = [
        {
            title: '#',
            dataIndex: 'index',
            render: (dom, susser, index) => {
                return (
                    <>{index + 1}</>
                );
            },
            align: 'center',
            search: false,
            width: 50,
        },
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
        },
        {
            title: '罐头数量',
            dataIndex: 'count',
            render: (dom, suser, index) => {
                return (
                    <>
                        <a onClick={
                            () => {
                                const list = suserMap.get(suser.uid) || [];
                                if (list.length > 0) {
                                    setSuserDetailModal(true);
                                    setDiaryList(list);
                                    setSUserIndex(index);
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
                            onCancel={() => { setSuserDetailModal(false); setDiaryList([]); setSUserIndex(-1); }}
                            footer={[
                                <Button
                                    onClick={() => {
                                        if (suserIndex > -1) {
                                            if (suserIndex + 1 < suserList.length) {
                                                setDiaryList(suserMap.get(suserList[suserIndex + 1].uid) || []);
                                            } else {
                                                setDiaryList([]);
                                                setSuserDetailModal(false);
                                                setSUserIndex(-1);
                                            }
                                            deleteSUserList(suserList[suserIndex].uid);
                                        } else {
                                            message.error('未设置 albumIndex ~');
                                        }
                                    }}
                                >
                                    下一个
                                </Button>,
                                <Button
                                    onClick={() => {
                                        setSuserDetailModal(false);
                                        setDiaryList([]);
                                        deleteSUserList(diaryList[0].user.id);
                                        setSUserIndex(-1);
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
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (dom, suser) => [
                <UserDetail userId={suser.uid} title="真身" />,
                <a onClick={() => { deleteSUserList(suser.uid); }}>
                    删除
                </a>,
            ],
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
                title={'suser列表：' + suserList.length}
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

export default SUserList;
