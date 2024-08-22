import React, { useState, useEffect, ReactNode } from 'react';
import { Button, Modal, Form, Input, Checkbox, Col, Row, Tooltip, message } from 'antd';
import { Diary } from '../../data';
import PhotoCarousel from '../PhotoCarousel';
import { request } from '@umijs/max';
import {
    DrawerForm,
    ProFormCheckbox,
    ProFormDigitRange,
} from '@ant-design/pro-components';

const url = 'http://localhost:8001';

interface ExportFormProps {
    diaryList: Diary[];
    removeDiaryList: (count: number) => void; // 注意这里的返回类型是void，表示这个函数不返回任何值  
}

type ExprotParams = {
    indexRange: number[];
    onlyReal: boolean;
};

const ExportForm: React.FC<ExportFormProps> = ({ diaryList, removeDiaryList }) => {

    const [form] = Form.useForm<ExprotParams>();

    // 导出指定范围的罐头
    const exportDiary = (min: number, max: number, onlyReal: boolean) => {
        let data = diaryList.slice(min, max);
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
            title="导出列表"
            //   resize={{
            //     onResize() {
            //       console.log('resize!');
            //     },
            //     maxWidth: window.innerWidth,
            //     minWidth: 300,
            //   }}
            form={form}
            initialValues={{
                indexRange: [0, diaryList.length],
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
                let min = 0;
                let max = diaryList.length;
                if (values.indexRange) {
                    if (values.indexRange[1]) {
                        max = Math.min(max, values.indexRange[1]);
                    }
                    if (values.indexRange[0]) {
                        if (values.indexRange[0] >= 0 && values.indexRange[0] < max) {
                            min = values.indexRange[0];
                        }
                    }
                }
                exportDiary(min, max, values.onlyReal);
                removeDiaryList(max);
                return true;
            }}
        >
            <span>当前总数：{diaryList.length}</span>
            <ProFormDigitRange
                label="导出数据范围"
                name="indexRange"
                separator="-"
                placeholder={['最小值', '最大值']}
                tooltip="索引从0开始"
            // separatorWidth={60}
            />
            <ProFormCheckbox name="onlyReal" >
                是否仅包含真身
            </ProFormCheckbox>
        </DrawerForm>
    );
};

export default ExportForm;