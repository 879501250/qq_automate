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
import QueryForm from './components/QueryForm';
import PhotoCarousel from './components/PhotoCarousel';
import SUserInfo from './components/SUserInfo';
import AlbumDetail from './components/AlbumDetail';
import UserDetail from './components/UserDetail';
import type { SUser, Diary, Mood } from './data.d';
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

  const { loading } = useModel('@@initialState');

  const [messageApi, contextHolder] = message.useMessage();

  const { styles } = useStyles();


  const [list, setList] = useState<Diary[]>([]);
  const lastScore = useRef(0);
  const appendData = () => {
    request(url + '/yiguan/listNew', {
      params: { 'lastScore': lastScore.current, },
      skipErrorHandler: true,
    }).then(function (res) {
      if (res.code == 1) {
        const data = res.data;
        if (data.diaries.length > 0) {
          lastScore.current = data.lastScore;
          setList(list.concat(data.diaries));
          messageApi.success(`新增罐头${data.diaries.length}个，当前共${data.diaries.length + list.length}个!`);
        }
      }
    });
  }

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
  const [time, setTime] = useState<number | null>(3);
  useEffect(() => {
    timer = setInterval(tick, time ? time * 1000 : 3000);
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
    actions.push(<Tag>{diary.id}</Tag>);
    actions.push(<Tag>{diary.score}</Tag>);
    if (diary.album) {
      actions.push(<AlbumDetail album={diary.album} title={diary.album.title || '罐头专辑'} />);
    }
    if (diary.user.id) {
      actions.push(
        <SUserInfo
          sUser={convertToSUser(diary)}
          trigger={<Button >详情</Button>}
          isInit={true}
        />
      );
    }
    actions.push(<Button danger onClick={() => removeDiaryList(index + 1)}>删除</Button>);
    return actions;
  };

  const convertToSUser = (diary: Diary): SUser => {
    const sUser: SUser = {
      uid: diary.user.id,
      diaryText: diary.text,
    };
    if (diary.album) {
      sUser.albumIds = diary.album.id;
      if (diary.album.photo) {
        sUser.photos = diary.album.photo;
      }
    }
    diary.photos.map((photo: string) => sUser.photos += ',' + photo);
    if (sUser.photos?.charAt(0) == ',') {
      sUser.photos = sUser.photos.slice(1);
    }
    return sUser;
  }

  if (loading) {
    return <div />;
  }

  return (
    <>
      {contextHolder}
      <QueryForm
        diaryList={list}
        setList={setList}
        removeDiaryList={removeDiaryList}
        time={time}
        setTime={setTime}
      />
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
                    <div>
                      <UserDetail userId={diary.user.id} title={diary.user.nickname} />
                    </div>
                  }
                  description={
                    <span>
                      <Tag>#{index}</Tag>
                      {
                        diary.isSUser
                        &&
                        <SUserInfo
                          sUser={{ uid: diary.user.id }}
                          trigger={<Tag color="#f50">S</Tag>}
                          isInit={false}
                        />
                      }
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
