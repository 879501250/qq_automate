import { useModel } from 'umi';
import {
  Card,
  Form,
  message,
  InputNumber,
  Upload,
  Button,
  Modal,
} from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import type { FC } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import QueryForm from './components/QueryForm';
import DiaryList from './components/DiaryList';
import StandardFormRow from './components/StandardFormRow';
import ExportForm from './components/ExportForm';
import type { Diary } from './data.d';
import useStyles from './style.style';
import { request } from '@umijs/max';

const FormItem = Form.Item;

const pageSize = 5;

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
  const [sUseList, setSUseList] = useState<Diary[]>([]);
  const [albumList, setAlbumList] = useState<Diary[]>([]);
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
          let sUsers: Diary[] = [];
          let albums: Diary[] = [];
          data.diaries.forEach((diary: Diary) => {
            if (diary.isSUser) {
              sUsers.push(diary);
            } else if (diary.album) {
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

  useEffect(() => {
    appendData();
  }, []);

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
                <Button onClick={() => { setSUseList([]); }}>
                  清空
                </Button>,
              ]}
            >
              <DiaryList
                diaryList={sUseList}
                removeDiaryList={(count) => { setSUseList(sUseList.slice(count)); }}
              />
            </Modal>
            <Button style={{ "margin": '0 10px 0 10px' }} onClick={() => { setAlbumModal(true) }}>
              专辑
            </Button>
            <Modal
              title={albumList.length}
              width={'80%'}
              open={albumModal}
              onCancel={() => { setAlbumModal(false) }}
              footer={[
                <Button onClick={() => { setAlbumList([]); }}>
                  清空
                </Button>,
              ]}
            >
              <DiaryList
                diaryList={albumList}
                removeDiaryList={(count) => { setAlbumList(albumList.slice(count)); }}
              />
            </Modal>
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

export default Diaries;
