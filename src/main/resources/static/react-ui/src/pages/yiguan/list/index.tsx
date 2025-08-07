import { useModel } from 'umi';
import {
  Card,
  Form,
  message,
  InputNumber,
  Upload,
  Button,
  Modal,
  Switch,
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import QueryForm from './components/QueryForm';
import AlbumList from './components/AlbumList';
import SUserList from './components/SUserList';
import DiaryList from '../common/DiaryList';
import StandardFormRow from '../common/StandardFormRow';
import ExportForm from './components/ExportForm';
import FollowDiaryList from '../common/FollowDiaryList';
import BackgroundDiaryList from './components/BackgroundDiaryList';
import type { Diary } from '../common/data';
import { request } from '@umijs/max';

const FormItem = Form.Item;

const pageSize = 5;

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const List: FC = () => {

  const { loading } = useModel('@@initialState');
  const {
    list, setList,
    getSUserMap, updateSUserMap,
    getAlbumMap, updateAlbumMap,
    lastScore,
    background, setBackground,
  } = useModel('yiguan.model');

  const [albumMap, setAlbumMap] = useState<Map<string, Diary[]>>(getAlbumMap());
  const [suserMap, setSUserMap] = useState<Map<string, Diary[]>>(getSUserMap());

  const [messageApi, contextHolder] = message.useMessage();

  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const appendData = () => {
    request('/yiguan/listNew', {
      params: { 'lastScore': lastScore.current, },
      skipErrorHandler: true,
    }).then(function (res) {
      if (res.code == 1) {
        const data = res.data;
        if (data.diaries.length > 0) {
          lastScore.current = data.lastScore;
          data.diaries.forEach((diary: Diary) => {
            if (diary.isSUser) {
              setSUserMap(prevMap => {
                const newMap = new Map(prevMap);
                const currentList = newMap.get(diary.user.id) || [];
                newMap.set(diary.user.id, [...currentList, diary]);
                return newMap;
              });
            } else if (diary.album && !diary.user.avatar) { // 专辑太多了，所以只看匿名张专辑
              // 单纯的匿名专辑也太多了，只看关注数>罐头数和最近30天新建的罐头
              if (albumMap.get(diary.album.id) != null
                || (diary.album.followNum || 0) >= (diary.album.diaryNum || 0)
                || Date.now() - thirtyDaysInMs < new Date(diary.album.createTime || Date.now()).getTime()) {
                setAlbumMap(prevMap => {
                  const newMap = new Map(prevMap);
                  const currentList = newMap.get(diary.album.id) || [];
                  newMap.set(diary.album.id, [...currentList, diary]);
                  return newMap;
                });
              }
            }
          })
          setList(list.concat(data.diaries));
          messageApi.success(`新增罐头${data.diaries.length}个，当前共${data.diaries.length + list.length}个!`);
        }
      }
    });
  }

  const backgroundRef = useRef(background);

  useEffect(() => {
    setAlbumMap(getAlbumMap());
    setSUserMap(getSUserMap());
    if (backgroundRef.current) {
      // 关闭后台查询任务
      stopBackgroundQueryScheduler();
    }
    appendData();
    return () => {
      // 开启后台查询任务
      if (backgroundRef.current) {
        startBackgroundQueryScheduler();
      }
    };
  }, []);

  useEffect(() => {
    updateAlbumMap(albumMap);
    updateSUserMap(suserMap);
  }, [albumMap, suserMap]);

  function startBackgroundQueryScheduler() {
    request('/yiguan/startBackgroundQueryScheduler', {
      params: {
        'lastScore': lastScore.current,
        'interval': time,
      },
      skipErrorHandler: true,
    }).then(function (res) {
      if (res.code == 0) {
        message.error(res.message);
      }
    });
  }

  function stopBackgroundQueryScheduler() {
    request('/yiguan/stopBackgroundQueryScheduler').then(function (res) {
      if (res.code == 0) {
        message.error(res.message);
      } else if (res.code == 1) {
        // 从后台查询的最新数据开始查询
        lastScore.current = res.data.lastScore;
      }
    });
  }

  function loadDiary(file: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsedData = JSON.parse(e.target?.result?.toString() || "");
        setList(parsedData.concat(list));
        message.success(`成功导入 ${parsedData.length} 条数据~`);
      } catch (error) {
        message.error('导入文件错误:' + error);
      }
    };
    reader.readAsText(file);
  }

  const saveCallBack: any = useRef();
  useEffect(() => {
    saveCallBack.current = appendData;
    return () => { };
  });
  let timer: NodeJS.Timeout;
  const tick = () => {
    saveCallBack.current();
  };
  const [time, setTime] = useState<number | null>(1);
  useEffect(() => {
    timer = setInterval(tick, time ? time * 1000 : 1000);
    return () => {
      clearInterval(timer);
    };
  }, [time]);

  if (loading) {
    return <div />;
  }

  return (
    <>
      {contextHolder}
      <QueryForm
        removeDiaryList={(count) => { setList(list.slice(count)); }}
        other={
          <StandardFormRow title="其它选项" grid last>
            <span>当前总数：{list.length}，S：{suserMap.size}，专辑：{albumMap.size}。</span>
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
            <SUserList suserMap={suserMap} setSUserMap={setSUserMap} />
            <AlbumList albumMap={albumMap} setAlbumMap={setAlbumMap} />
            <FollowDiaryList />
            <Button
              style={{ "margin": '0 10px 0 10px' }}
              onClick={() => {
                setSUserMap(new Map());
                setAlbumMap(new Map());
                setList([]);
              }}
            >
              全部清空
            </Button>
            <span>后台查询：</span>
            <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={background}
              onChange={(checked) => { setBackground(checked); backgroundRef.current = checked; }} />
            <BackgroundDiaryList />
            <Upload
              beforeUpload={(file) => {
                loadDiary(file);
                return false;
              }}
              maxCount={1}
              showUploadList={false}
            >
              <Button style={{ "margin": '0 10px 0 10px' }}>导入</Button>
            </Upload>
            <ExportForm diaryList={list} removeDiaryList={(count) => { setList(list.slice(count)); }} />
          </StandardFormRow>
        }
      />
      <Card
        style={{ marginTop: 24 }}
        bordered={false}
      // bodyStyle={{ padding: '8px 32px 32px 32px' }}
      >
        <DiaryList
          diaryList={list}
          removeDiaryList={(count) => {
            setList(list.slice(count));
          }}
        />
      </Card>
    </>
  );
};

export default List;
