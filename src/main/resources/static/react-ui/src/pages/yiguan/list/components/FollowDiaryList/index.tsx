import { useState, FC } from 'react';
import { formatTimestamp, followedDirays } from '../../../common/service';
import {
    Button,
    Modal,
} from 'antd';
import DiaryList from '../DiaryList';
import type { Diary } from '../../../common/data';

const FollowDiaryList: FC = () => {

    const [followList, setFollowList] = useState<Diary[]>([]);
    const [followModal, setFollowModal] = useState(false);

    return (
        <>
            <Button style={{ "margin": '0 10px 0 10px' }}
                onClick={() => {
                    setFollowList(Array.from(followedDirays));
                    setFollowModal(true);
                }}
            >
                关注
            </Button>
            <Modal
                title={'关注的罐子列表'}
                width={'80%'}
                open={followModal}
                onCancel={() => { setFollowModal(false) }}
                footer={[
                    <Button onClick={() => { setFollowList([]); followedDirays.clear(); }}>
                        清空
                    </Button>,
                ]}
            >
                <DiaryList
                    diaryList={followList}
                    removeDiaryList={(count) => {
                        followedDirays.delete(followList[count - 1]);
                        setFollowList(Array.from(followedDirays));
                    }}
                />
            </Modal>
        </>
    );
};

export default FollowDiaryList;
