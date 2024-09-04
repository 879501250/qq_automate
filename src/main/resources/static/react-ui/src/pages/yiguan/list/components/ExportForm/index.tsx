import React, { useState, useEffect, ReactNode } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col, Row, Tooltip, message } from 'antd';
import { Diary } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import {
    DrawerForm,
    ProFormCheckbox,
    ProFormDigit,
} from '@ant-design/pro-components';

// const url = 'http://localhost:8001';
const url = '';

interface ExportFormProps {
    diaryList: Diary[];
    removeDiaryList: (count: number) => void; // 注意这里的返回类型是void，表示这个函数不返回任何值  
}

type ExprotParams = {
    index: number;
    onlyReal: boolean;
};

const ExportForm: React.FC<ExportFormProps> = ({ diaryList, removeDiaryList }) => {

    const [form] = Form.useForm<ExprotParams>();

    // 导出指定范围的罐头
    const exportDiary = (index: number, onlyReal: boolean) => {
        let data = diaryList.slice(index);
        if (onlyReal) {
            data = data.filter((diary: Diary) => diary.user.id);
        }
        const dataStr = JSON.stringify(data, null, 2);
        const blob = new Blob([dataStr], { type: 'text/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        message.success(`导出 ${data.length} 条数据~`);
    };


    return (
        <DrawerForm<ExprotParams>
            title="导出最新罐头列表"
            //   resize={{
            //     onResize() {
            //       console.log('resize!');
            //     },
            //     maxWidth: window.innerWidth,
            //     minWidth: 300,
            //   }}
            form={form}
            initialValues={{
                index: 0,
                onlyReal: false,
            }}
            trigger={
                <Button>
                    导出
                </Button>
            }
            submitter={{
                render: (props, defaultDoms) => {
                    return [
                        ...defaultDoms,
                        <Button
                            key="extra-reset"
                            onClick={() => {
                                props.reset();
                            }}
                        >
                            重置
                        </Button>,
                    ];
                },
            }}
            //   autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
            }}
            //   submitTimeout={2000}
            onFinish={async (values) => {
                exportDiary(values.index, values.onlyReal);
                removeDiaryList(diaryList.length);
                return true;
            }}
        >
            <span>当前总数：{diaryList.length}</span>
            <ProFormDigit
                name="index"

                label="从当前索引开始导出"
                max={diaryList.length - 1}
                fieldProps={{ precision: 0, changeOnWheel: true }}
                tooltip="索引从 0 开始，最大不超过列表总数"
            />
            <ProFormCheckbox name="onlyReal" >
                是否仅包含真身
            </ProFormCheckbox>
        </DrawerForm>
    );
};

export default ExportForm;