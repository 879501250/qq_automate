import React from 'react';
import {
    List,
} from 'antd';
import { Diary } from '../data';
import PhotoCarousel from '../PhotoCarousel';

interface DetailProps {
    diary: Diary;
    index: number;
    actions: React.ReactNode[] | undefined;
    metaData?: JSX.Element;
    photos?: string[];
}

const photoUrl = 'http://photo.pcdn.jijigugu.club/';

const DiaryDetail: React.FC<DetailProps> = ({ diary, index, actions, metaData, photos }) => {

    return (
        <List.Item
            key={diary.id}
            actions={actions}
            extra={
                <div style={{ width: '250px', height: '250px', margin: '0 20px 0 0' }}>
                    <PhotoCarousel photos={photos ? photos : diary.photos} />
                </div>
            }
        >
            {metaData}
            <div style={{ whiteSpace: 'pre-line' }}>{diary.text}</div>
        </List.Item>
    );
};

export default DiaryDetail;