import React from 'react';
import {
  List,
  Progress,
  Flex,
} from 'antd';
import { Bar, Column } from '@ant-design/plots';
import { Diary, voteOption } from '../data';
import PhotoCarousel from '../PhotoCarousel';
import Center from '@/pages/account/center';
import { groupBy, size } from 'lodash';

interface DetailProps {
  diary: Diary;
  index: number;
  actions: React.ReactNode[] | undefined;
  metaData?: JSX.Element;
  photos?: string[];
}

interface option {
  gender: string;
  option: string;
  num: number;
}

const photoUrl = 'http://photo.pcdn.jijigugu.club/';

const DiaryDetail: React.FC<DetailProps> = ({ diary, index, actions, metaData, photos }) => {

  const getVoteData = (): option[] => {
    const data: option[] = [];
    if (diary.vote) {
      var num = diary?.voteUserNum ? diary.voteUserNum : 0;
      diary.vote?.map((voteOption: voteOption) => {
        data.push({
          gender: '男',
          option: voteOption.option,
          num: Math.round(voteOption.malePercent * voteOption.optionPercent / 10000 * num),
        })
        data.push({
          gender: '女',
          option: voteOption.option,
          num: Math.round(voteOption.femalePercent * voteOption.optionPercent / 10000 * num),
        })
      })
    }
    return data;
  };

  const config = {
    data: getVoteData(),
    xField: 'option',
    yField: 'num',
    seriesField: 'gender',

    title: {
      title: diary.voteUserNum + '人参加了投票',
      align: 'center',
      size: 14,
      titleFontSize: 14,
    },
    label: {
      text: (o: option) => o.num,
      textBaseline: 'bottom',
      position: 'inside',
      fontSize: 10,
      "transform": [
        {
          "type": "contrastReverse"
        }
      ]
    },
    style: {
      fill: (o: option) => {
        if (o.gender === '男') {
          return '#63BBF4';
        }
        return '#EB4875';
      },
      maxWidth: 12,
    },
  };

  return (
    <List.Item
      styles={{
        actions: {
          margin: 0,
        }
      }}
      key={diary.id}
      actions={actions}
      extra={
        <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
          <PhotoCarousel photos={photos ? photos : diary.photos} />
        </div>
      }
    >
      {metaData}
      <div
        style={{
          whiteSpace: 'pre-line',
          marginBottom: 10,
        }}>
        {diary.text}
      </div>
      {
        diary.vote &&
        <div>
          <Flex vertical gap="small" >
            <Column
              {...config}
              marginTop={0}
              width={diary.vote.length * 50 + 50}
              height={200}
              axis={{
                x: {
                  tick: false,
                  // labelFontSize: 12,
                  labelAutoWrap: {
                    margin: [50],
                    wordWrapWidth: 50,
                    maxLines: 3,
                    recoverWhenFailed: false
                  },
                  size: 20,
                },
                y: false,
              }}
            />
          </Flex>
        </div>
      }
    </List.Item>
  );
};

export default DiaryDetail;