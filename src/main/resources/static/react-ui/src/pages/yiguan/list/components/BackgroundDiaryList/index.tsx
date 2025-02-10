import React, { useState } from 'react';
import {
    Button,
    Modal,
    message,
} from 'antd';
import DiaryList from '../../../common/DiaryList';
import type { Diary } from '../../../common/data';
import { request } from '@umijs/max';

// const url = 'http://localhost:8001';
const url = '';

const BackgroundDiaryList: React.FC = () => {

    const [modal, setModal] = useState(false);

    const [list, setList] = useState<Diary[]>([]);

    function getBackgroundYiguanDiaryList() {
        request(url + '/yiguan/getBackgroundYiguanDiaryList').then(function (res) {
            if (res.code == 1) {
                setList(res.data.diaries);
                setModal(true);
            } else {
                message.error(res.message);
            }
        });
    }

    function removeBackgroundYiguanDiary(id: string) {
        request(url + '/yiguan/removeBackgroundYiguanDiary', {
            params: {
                'id': id,
            },
            skipErrorHandler: true,
        }).then(function (res) {

        });
    }

    function clearBackgroundYiguanDiaryList() {
        request(url + '/yiguan/clearBackgroundYiguanDiary').then(function (res) {

        });
    }

    return (
        <>
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={getBackgroundYiguanDiaryList}>
                后台列表
            </Button>
            <Modal
                title={list.length}
                width={'80%'}
                open={modal}
                onCancel={() => { setModal(false) }}
                footer={[
                    <Button onClick={() => { clearBackgroundYiguanDiaryList(); setList([]); }}>
                        清空
                    </Button>,
                ]}
            >
                <DiaryList
                    diaryList={list}
                    removeDiaryList={(count) => {
                        removeBackgroundYiguanDiary(list[count - 1].id);
                        setList(list.slice(count));
                    }}
                />
            </Modal>
        </>
    );
};

export default BackgroundDiaryList;