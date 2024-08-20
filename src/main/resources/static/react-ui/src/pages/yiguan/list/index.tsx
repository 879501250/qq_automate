import { SyncOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Avatar, Card, Col, Form, List, Row, Select, Tag, message, Button, Tooltip, InputNumber } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import type { FC } from 'react';
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { categoryOptions } from '../mock';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import PhotoCarousel from './components/PhotoCarousel';
import SUserInfo from './components/SUserInfo';
import type { ListItemDataType, Diary, ListParams } from './data.d';
import { queryFakeList } from './service';
import useStyles from './style.style';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';

const FormItem = Form.Item;

const pageSize = 5;
const ContainerHeight = 700;

const url = 'http://localhost:8001';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};



const Diaries: FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { styles } = useStyles();
  // const listParams:ListParams ={
  //   lastScore: 0,
  // };

  const [listParams, setListParams] = useState<ListParams>();

  const [list, setList] = useState<Diary[]>([]);
  const saveCallBack: any = useRef();
  const appendData = () => {
    request(url + '/yiguan/listNew', {
      params: listParams,
      skipErrorHandler: true,
    }).then(function (data) {
      if (data.code == 1) {
        if (data.data.length > 0) {
          setList(list.concat(data.data));
          setListParams({ ...listParams, lastScore: data.data[data.data.length - 1].createTime })
          messageApi.success(`新增罐头${data.data.length}个，当前共${data.data.length + list.length}个!`);
        }
      }
    });
  }
  appendData();
  useEffect(() => {
    saveCallBack.current = appendData;
    return () => { };
  });
  let timer: NodeJS.Timeout;
  const [time, setTime] = useState<number | null>(5);
  const tick = () => {
    saveCallBack.current();
  };
  useEffect(() => {
    timer = setInterval(tick, time ? time * 1000 : 5000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  const removeDiaryClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, index: number) => {
    setList(list.slice(index + 1));
  };

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
    actions.push(<Button danger onClick={(event) => removeDiaryClick(event, index)}>删除</Button>);
    return actions;
  };

  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
    {
      id: 'zxx',
      name: '周星星',
    },
    {
      id: 'zly',
      name: '赵丽颖',
    },
    {
      id: 'ym',
      name: '姚明',
    },
  ];

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
    },
  };

  const ownerOptions = useMemo<DefaultOptionType[]>(
    () =>
      owners.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [owners],
  );


  return (
    <>
      {contextHolder}
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['wjh', 'zxx'],
          }}
        // onValuesChange={reload}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions.map((category) => (
                  <TagSelect.Option value={category.value!} key={category.value}>
                    {category.label}
                  </TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="owner" grid>
            <FormItem name="owner" noStyle>
              <Select
                mode="multiple"
                placeholder="选择 owner"
                style={{ minWidth: '6rem' }}
                options={ownerOptions}
              />
            </FormItem>
            <a className={styles.selfTrigger} onClick={setOwner}>
              只看自己的
            </a>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="活跃用户" name="user">
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: '李三',
                        value: 'lisa',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select
                    placeholder="不限"
                    style={{ maxWidth: 200, width: '100%' }}
                    options={[
                      {
                        label: '优秀',
                        value: 'good',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
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
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
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
                  avatar={<Avatar src={diary.user.avatar} size='large' />}
                  title={
                    <a>
                      {diary.user.nickname}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>#{index}</Tag>
                      <Tag>{diary.mood}</Tag>
                      {diary.user.age && <Tag>{diary.user.age}</Tag>}
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
