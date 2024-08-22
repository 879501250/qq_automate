import { SyncOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import {
  Avatar,
  Card,
  Form,
  List,
  Select,
  Tag,
  message,
  Button,
  Tooltip,
  InputNumber,
  Upload,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import type { FC } from 'react';
import type { UploadProps, UploadFile } from 'antd';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { categoryOptions } from '../mock';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import PhotoCarousel from './components/PhotoCarousel';
import SUserInfo from './components/SUserInfo';
import ExportForm from './components/ExportForm';
import type { ListItemDataType, Diary, QueryParams, Mood } from './data.d';
import { queryFakeList } from './service';
import useStyles from './style.style';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';

const FormItem = Form.Item;

const pageSize = 5;
const ContainerHeight = 700;

// const url = 'http://localhost:8001';
const url = '';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



const Diaries: FC = () => {

  const { initialState, loading, refresh, setInitialState } = useModel('@@initialState');

  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { styles } = useStyles();

  const [selectedIpLocations, setSelectedIpLocations] = useState<string[]>(["全部"]);

  const ipLocations: string[] = ["全部", "海外"].concat(initialState?.chinaProvinces || []);
  const filteredIps = ipLocations.filter((o) => {
    return !selectedIpLocations.includes(o);
  });


  function loadDiary(file: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target?.result?.toString() || "");
        setList(parsedData.concat(list));
        messageApi.success(`成功导入 ${parsedData.length} 条数据~`);
      } catch (error) {
        messageApi.error('导入文件错误:' + error);
      }
    };
    reader.readAsText(file);
  }

  const [lastScore, setLastScore] = useState<number>(0);

  const [list, setList] = useState<Diary[]>([]);
  const appendData = () => {
    request(url + '/yiguan/listNew', {
      params: { lastScore },
      skipErrorHandler: true,
    }).then(function (res) {
      if (res.code == 1) {
        const data = res.data;
        if (data.diaries.length > 0) {
          setList(list.concat(data.diaries));
          setLastScore(data.lastScore)
          messageApi.success(`新增罐头${data.diaries.length}个，当前共${data.diaries.length + list.length}个!`);
        }
      }
    });
  }


  const initialQueryParams: QueryParams = {
    realQueryMoods:
      (initialState?.moods || [])
        .filter((mood: Mood) => mood.realEnable == 1)
        .map((mood: Mood) => mood.name),
    shadowQueryMoods:
      (initialState?.moods || [])
        .filter((mood: Mood) => mood.shadowEnable == 1)
        .map((mood: Mood) => mood.name),
    ipLocations: ['全部'],
    contents: [],
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

  useEffect(() => {
    appendData();
  }, []);

  const saveCallBack: any = useRef();
  useEffect(() => {
    saveCallBack.current = appendData;
    return () => { };
  });
  let timer: NodeJS.Timeout;
  const tick = () => {
    saveCallBack.current();
  };
  const [time, setTime] = useState<number | null>(5);
  useEffect(() => {
    timer = setInterval(tick, time ? time * 1000 : 5000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  // 移除罐头列表前 count 项
  const removeDiaryList = (count: number) => {
    setList(list.slice(count));
  }

  const getActions = (diary: Diary, index: number): React.ReactNode[] => {
    const actions: React.ReactNode[] = [];
    actions.push(<Tag>{diary.score}</Tag>);
    if (diary.album) {
      actions.push(
        <Tooltip
          title={
            <div style={{ width: '300px', height: '250px' }}>
              <PhotoCarousel photos={[diary.album.photo]} />
            </div>
          }
        >
          <span>{diary.album.title}</span>
        </Tooltip>
      );
    }
    if (diary.user.id) {
      actions.push(<SUserInfo diary={diary} />);
    }
    actions.push(<Button danger onClick={() => removeDiaryList(index + 1)}>删除</Button>);
    return actions;
  };

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  if (loading) {
    return <div />;
  }

  return (
    <>
      {contextHolder}
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={initialQueryParams}
          onValuesChange={
            (changeValues, values) => {
              setQueryParams(values);
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
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
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
          <StandardFormRow title="其它选项" grid last>
            <span>当前总数：{list.length}</span>
            <SyncOutlined spin style={{ color: '#1677ff' }} />
            <InputNumber
              min={0.5}
              max={10}
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
            <ExportForm diaryList={list} removeDiaryList={removeDiaryList} />
          </StandardFormRow>
        </Form>
      </Card >
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
      // bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <List itemLayout="vertical">
          <VirtualList
            data={list}
            height={ContainerHeight}
            itemHeight={50}
            itemKey="id"
          // onScroll={onScroll}
          >
            {(diary: Diary, index) => (
              <List.Item
                key={diary.id}
                actions={getActions(diary, index)}
                extra={
                  <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
                    <PhotoCarousel photos={diary.photos} />
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={diary.user.avatar || ''}
                      icon={!diary.user.avatar && <UserOutlined />}
                      size={64} />
                  }
                  title={
                    <a>
                      {diary.user.nickname}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>#{index}</Tag>
                      {diary.isSUser && <Tag>S</Tag>}
                      <Tag>{diary.mood}</Tag>
                      {diary.user.age && <Tag>{diary.user.age}</Tag>}
                      {diary.ipLocation && <Tag>{diary.ipLocation}</Tag>}
                      {diary.ipLocation && <Tag>{diary.ipLocation}</Tag>}
                    </span>
                  }
                />
                {diary.text}
              </List.Item>
            )}
          </VirtualList>
        </List>
      </Card>
    </>
  );
};

export default Diaries;
