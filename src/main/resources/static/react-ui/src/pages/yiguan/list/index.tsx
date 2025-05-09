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
  const { list, setList,
    sUseList, setSUseList,
    albumList, setAlbumList,
    lastScore,
    background, setBackground,
  } = useModel('yiguan.model');

  const [messageApi, contextHolder] = message.useMessage();

  const appendData = () => {
    request('/yiguan/listNew', {
      params: { 'lastScore': lastScore.current, },
      skipErrorHandler: true,
    }).then(function (res) {
      if (res.code == 1) {
        const data = res.data;
        if (data.diaries.length > 0) {
          lastScore.current = data.lastScore;
          let sUsers: Diary[] = [];
          let albums: Diary[] = [];
          data.diaries.forEach((diary: Diary) => {
            if (diary.isSUser) {
              sUsers.push(diary);
            } else if (diary.album && !diary.user.avatar) { // 专辑太多了，所以只看匿名张专辑
              albums.push(diary);
            }
          })
          if (sUsers.length > 0) {
            setSUseList(sUseList.concat(sUsers));
          }
          if (albums.length > 0) {
            setAlbumList(albumList.concat(albums));
          }
          setList(list.concat(data.diaries));
          messageApi.success(`新增罐头${data.diaries.length}个，当前共${data.diaries.length + list.length}个!`);
        }
      }
    });
  }

  const backgroundRef = useRef(background);

  useEffect(() => {
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

  function cleanDiary(SUserDiaryIndex: number, albumDiaryIndex: number) {
    if (SUserDiaryIndex >= 0 || albumDiaryIndex >= 0) {
      for (let n = 0; n < list.length; n++) {
        if (SUserDiaryIndex >= 0) {
          if (list[n].id == sUseList[SUserDiaryIndex].id) {
            setList(list.slice(n));
            break;
          }
        }
        if (albumDiaryIndex >= 0) {
          if (list[n].id == albumList[albumDiaryIndex].id) {
            setList(list.slice(n));
            break;
          }
        }
      }
    }
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

  const [sUserModal, setSUserModal] = useState(false);
  const [albumModal, setAlbumModal] = useState(false);

  if (loading) {
    return <div />;
  }

  return (
    <>
      {contextHolder}
      <QueryForm
        diaryList={list}
        setList={setList}
        removeDiaryList={(count) => { setList(list.slice(count)); }}
        other={
          <StandardFormRow title="其它选项" grid last>
            <span>当前总数：{list.length}，S：{sUseList.length}，专辑：{albumList.length}。</span>
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
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={() => { setSUserModal(true) }}>
              S
            </Button>
            <Modal
              title={sUseList.length}
              width={'80%'}
              open={sUserModal}
              onCancel={() => { setSUserModal(false) }}
              footer={[
                <Button onClick={() => { cleanDiary(-1, albumList.length - 1); setSUseList([]); }}>
                  清空
                </Button>,
              ]}
            >
              <DiaryList
                diaryList={sUseList}
                removeDiaryList={(count) => {
                  cleanDiary(count - 1, albumList.length - 1);
                  setSUseList(sUseList.slice(count));
                }}
              />
            </Modal>
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={() => { setAlbumModal(true) }}>
              匿名专辑
            </Button>
            <Modal
              title={albumList.length}
              width={'80%'}
              open={albumModal}
              onCancel={() => { setAlbumModal(false) }}
              footer={[
                <Button onClick={() => { cleanDiary(sUseList.length - 1, - 1); setAlbumList([]); }}>
                  清空
                </Button>,
              ]}
            >
              <DiaryList
                diaryList={albumList}
                removeDiaryList={(count) => {
                  cleanDiary(sUseList.length - 1, count - 1);
                  setAlbumList(albumList.slice(count));
                }}
                extActions={(diary, index) => {
                  const actions: React.ReactNode[] = [];
                  actions.push(
                    <Button danger onClick={
                      () => {
                        setAlbumList(albumList.filter(albumDiary => diary.album.id != albumDiary.album.id));
                      }
                    }>删除专辑</Button>
                  );
                  return actions;
                }}
              />
            </Modal>
            <FollowDiaryList />
            <Button
              style={{ "margin": '0 10px 0 10px' }}
              onClick={() => {
                setSUseList([]);
                setAlbumList([]);
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
            let i = 0, j = 0;
            for (let n = 0; n < count; n++) {
              if (sUseList.length > i && list[n].id == sUseList[i].id) {
                i++;
              }
              if (albumList.length > j && list[n].id == albumList[j].id) {
                j++;
              }
            }
            if (i > 0) {
              setSUseList(sUseList.slice(i));
            }
            if (j > 0) {
              setAlbumList(albumList.slice(j));
            }
            setList(list.slice(count));
          }}
        />
      </Card>
    </>
  );
};

export default List;
