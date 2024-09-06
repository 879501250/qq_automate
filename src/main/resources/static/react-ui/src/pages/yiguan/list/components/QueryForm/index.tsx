import { SyncOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { useModel } from 'umi';
import {
    Card,
    Form,
    Select,
    message,
    Button,
    InputNumber,
    Upload,
    Switch,
} from 'antd';
import { Mood, Diary } from '../../data';
import StandardFormRow from '../StandardFormRow';
import TagSelect from '../TagSelect';
import ExportForm from '../ExportForm';
import { request } from '@umijs/max';

type QueryParams = {
    realQueryMoods: string[];
    shadowQueryMoods: string[];
    ipLocations: string[];
    contents: string[];
    enableShadow: boolean;
}

interface QueryFormProps {
    diaryList: Diary[];
    setList: (list: Diary[]) => void;
    removeDiaryList: (count: number) => void;
    time: number | null;
    setTime: (time: number | null) => void;
}

const FormItem = Form.Item;

// const url = 'http://localhost:8001';
const url = '';

const QueryForm: React.FC<QueryFormProps> = ({ diaryList, setList, removeDiaryList, time, setTime }) => {

    const { initialState } = useModel('@@initialState');

    const [form] = Form.useForm();


    const [selectedIpLocations, setSelectedIpLocations] = useState<string[]>(["全部"]);
    const [enableShadow, setEnableShadow] = useState<boolean>(true);

    const ipLocations: string[] = ["全部", "海外"].concat(initialState?.chinaProvinces || []);
    const filteredIps = ipLocations.filter((o) => {
        return !selectedIpLocations.includes(o);
    });
    const initialQueryParams: QueryParams = {
        realQueryMoods:
            (initialState?.moods || [])
                .filter((mood: Mood) => mood.realEnable == 1)
                .map((mood: Mood) => mood.name),
        shadowQueryMoods:
            (initialState?.moods || [])
                .filter((mood: Mood) => mood.shadowEnable == 1)
                .map((mood: Mood) => mood.name),
        ipLocations: ['上海', '浙江'],
        contents: ['上海', '浙江'],
        enableShadow: enableShadow,
    };

    const [queryParams, setQueryParams] = useState<QueryParams>(initialQueryParams);
    useEffect(() => {
        request(url + '/yiguan/setQueryListParams', {
            method: 'post',
            params: queryParams,
            skipErrorHandler: true,
        }).then(function (res) {
            // if (res.code == 1) {
            //   console.log(res.data);
            // }
        });
    }, [queryParams]);

    function loadDiary(file: any) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsedData = JSON.parse(e.target?.result?.toString() || "");
                setList(parsedData.concat(diaryList));
                message.success(`成功导入 ${parsedData.length} 条数据~`);
            } catch (error) {
                message.error('导入文件错误:' + error);
            }
        };
        reader.readAsText(file);
    }

    return (
        <>
            <Card bordered={false}>
                <Form
                    layout="inline"
                    form={form}
                    initialValues={initialQueryParams}
                    onValuesChange={
                        (changeValues, values) => {
                            const copy = { ...queryParams }; 
                            Object.keys(changeValues).forEach(key => {
                                if (copy.hasOwnProperty(key)) {
                                    copy[key as keyof QueryParams] = changeValues[key];
                                }
                            })
                            console.log(copy);
                            setQueryParams(copy);
                        }}
                >
                    <StandardFormRow title="真身查询" block style={{ paddingBottom: 11 }}>
                        <FormItem name="realQueryMoods">
                            <TagSelect expandable>
                                {(initialState?.moods || []).map((mood) => (
                                    <TagSelect.Option value={mood.name!} key={mood.name}>
                                        {mood.name}
                                    </TagSelect.Option>
                                ))}
                            </TagSelect>
                        </FormItem>
                    </StandardFormRow>
                    <StandardFormRow title="是否查询分身" grid>
                        <Form.Item name="enableShadow" valuePropName="checked">
                            <Switch checkedChildren="是" unCheckedChildren="否" onChange={setEnableShadow} />
                        </Form.Item>
                    </StandardFormRow>
                    {enableShadow &&
                        <div>
                            <StandardFormRow title="分身查询" block style={{ paddingBottom: 11 }}>
                                <FormItem name="shadowQueryMoods">
                                    <TagSelect expandable>
                                        {(initialState?.moods || []).map((mood) => (
                                            <TagSelect.Option value={mood.name!} key={mood.name}>
                                                {mood.name}
                                            </TagSelect.Option>
                                        ))}
                                    </TagSelect>
                                </FormItem>
                            </StandardFormRow>
                            <StandardFormRow title="分身地区" grid>
                                <FormItem name="ipLocations" noStyle>
                                    <Select
                                        mode="multiple"
                                        placeholder="选择地区"
                                        style={{ minWidth: '6rem' }}
                                        value={selectedIpLocations}
                                        onChange={setSelectedIpLocations}
                                        options={filteredIps.map((item) => ({
                                            value: item,
                                            label: item,
                                        }))}
                                    />
                                </FormItem>
                            </StandardFormRow>
                            <StandardFormRow title="分身内容" grid>
                                <FormItem name="contents" noStyle>
                                    <Select
                                        mode="tags"
                                        style={{ width: '100%' }}
                                        placeholder="所包含的内容"
                                    />
                                </FormItem>
                            </StandardFormRow>
                        </div>
                    }
                    <StandardFormRow title="其它选项" grid last>
                        <span>当前总数：{diaryList.length}</span>
                        <SyncOutlined spin style={{ color: '#1677ff' }} />
                        <InputNumber
                            min={0.1}
                            max={60}
                            value={time}
                            onChange={setTime}
                            // defaultValue={5.0}
                            step={0.5}
                            changeOnWheel
                            suffix="秒"
                        />
                        <Upload
                            beforeUpload={(file) => {
                                loadDiary(file);
                                return false;
                            }}
                            maxCount={1}
                        >
                            <Button>导入</Button>
                        </Upload>
                        <ExportForm diaryList={diaryList} removeDiaryList={removeDiaryList} />
                    </StandardFormRow>
                </Form>
            </Card >
        </>
    );
};

export default QueryForm;