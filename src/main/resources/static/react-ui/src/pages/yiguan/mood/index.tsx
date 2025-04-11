import React, { useState, useRef, FC, useEffect } from 'react';
import { useModel } from 'umi';
import { request } from '@umijs/max';
import { Select, Avatar, Card, Form, List, Tag, Button, Space, Input } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Diary, Mood, SUser } from '../common/data';
import VirtualList from 'rc-virtual-list';
import { UserOutlined } from '@ant-design/icons';
import { followedDirays, formatTimestamp } from '../common/service';
import AlbumDetail from '../common/AlbumDetail';
import DiaryDetail from '../common/DiaryDetail';
import SUserInfo from '../common/SUserInfo';
import CommentList from '../common/CommentList';
import UserDetail from '../common/UserDetail';
import FollowDiaryList from '../common/FollowDiaryList';

const ContainerHeight = 700;
type QueryParams = {
    mid: string;
    gender: string;
    age: string;
}

const listUrl = 'https://api.jijigugu.club/feed/list';
const photoUrl = 'http://photo.pcdn.jijigugu.club/';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const FormItem = Form.Item;

const MoodList: FC = () => {
    const [form] = Form.useForm();

    const { initialState } = useModel('@@initialState');
    const { initialQueryParams, setInitialQueryParams } = useModel('yiguan.model');

    const ages = ['05+', '00+', '95+', '90+', '85+', '80+', '80-'];

    const getActions = (diary: Diary, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(<Tag color='white' style={{ color: 'black' }}>{diary.id}</Tag>);
        actions.push(<Tag color='white' style={{ color: 'black' }}>{formatTimestamp(diary.createTime * 1000)}</Tag>);
        actions.push(
            <a
                style={{ color: 'inherit' }}
                onClick={() => {
                    diary.mood = diary.mood.name;
                    if (diary.user.avatar) {
                        diary.user.avatar = photoUrl + diary.user.avatar.key;
                    }
                    diary.photos = diary.photos.map((photo) => photo.url);
                    diary.score = formatTimestamp(diary.createTime * 1000);
                    followedDirays.add(diary);
                }}
            >
                {React.createElement(StarOutlined)}
            </a>
        );
        actions.push(
            <IconText
                icon={LikeOutlined}
                text={diary.likedNum ? '' + diary.likedNum : '0'}
                key="list-vertical-like-o"
            />
        );
        if (diary.isCommentOpen) {
            actions.push(
                <CommentList did={diary.id}
                    tigger={
                        <IconText
                            icon={MessageOutlined}
                            text={diary.commentedNum ? '' + diary.commentedNum : '0'}
                            key="list-vertical-message"
                        />
                    }
                />);
        }
        if (diary.album) {
            actions.push(
                <AlbumDetail album={diary.album} title={diary.album.title || "罐头专辑"} uid={diary.user.id} />
            );
            diary.user.id = diary.album.uid || '';
        }
        actions.push(
            <SUserInfo
                sUser={convertToSUser(diary)}
                trigger={<Button>详情</Button>}
                diaryId={diary.id}
            />
        );
        actions.push(
            <Button
                onClick={() => {
                    setInitialQueryParams({
                        ...initialQueryParams,
                        socre: diary.score,
                    });
                    form.setFieldsValue({
                        socre: diary.score,
                    });
                }}
            >
                标记
            </Button>
        );
        return actions;
    }

    const convertToSUser = (diary: Diary): SUser => {
        const sUser: SUser = {
            uid: diary.user.id,
            diaryText: diary.text,
            photos: "",
        };
        if (diary.album) {
            if (diary.album.photo) {
                sUser.photos = diary.album.photo;
            }
        }
        diary.photos.map((photo: any) => sUser.photos += ',' + photo.url);
        if (sUser.photos?.charAt(0) == ',') {
            sUser.photos = sUser.photos.slice(1);
        }
        return sUser;
    }

    const encodeURIValue = (value: any[], defaultValue: any[], isString: boolean): string => {
        // 如果 value 数组为空，则使用 defaultValue 数组
        const effectiveValue = value.length === 0 ? defaultValue : value;
        // 使用 map 方法处理数组中的每个元素，根据 isString 参数决定是否添加引号
        const elements = effectiveValue.map(item => (isString ? `"${item}"` : String(item)));
        // 使用 join 方法将数组元素拼接成一个字符串，元素之间用逗号分隔
        const joinedString = elements.join(',');
        // 将拼接好的字符串用方括号包围，并编码为 URI 组件
        return encodeURIComponent(`[${joinedString}]`);
    }

    const [data, setData] = useState<Diary[]>([]);
    const [queryParams, setQueryParams] = useState<QueryParams>({
        mid: initialQueryParams.mood,
        gender: encodeURIValue(initialQueryParams.gender, ['1', '2'], false),
        age: encodeURIValue(ages, ages, true),
    });

    useEffect(() => {
        refresh();
    }, [queryParams]);

    function refresh() {
        setData([]);
    }

    useEffect(() => {
        if (data.length == 0) {
            appendData(true);
        } else if (data.length < 3) {
            // 如果查到的数据不足以触发滚动查询，提前多查几次
            appendData(false);
        }
    }, [data]);

    const userLastScore: any = useRef(initialQueryParams.socre);
    const appendData = (init: boolean) => {
        const url = listUrl + '?lastScore=' + userLastScore.current
            + '&mid=' + queryParams.mid
            + '&gender=' + queryParams.gender
            + '&age=' + queryParams.age;
        request(url, {
            // params: {
            //     'lastScore': userLastScore.current,
            //     'mid': queryParams.mid,
            //     'gender': queryParams.gender,
            //     'age': queryParams.age,
            // },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 0) {
                if (res.lastScore) {
                    userLastScore.current = res.lastScore;
                    if (init) {
                        setData(res.data);
                    } else {
                        setData(data.concat(res.data));
                    }
                }
            }
        });
    };

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData(false);
        }
    };

    return (
        <>
            <Card bordered={false}>
                <Form
                    layout="inline"
                    form={form}
                    initialValues={initialQueryParams}
                    onValuesChange={
                        (changeValues, values) => {
                            setInitialQueryParams({
                                ...initialQueryParams,
                                mood: values.mood,
                                gender: values.gender,
                                age: values.age,
                                socre: '',
                            });
                            userLastScore.current = '';
                            form.setFieldsValue({
                                socre: '',
                            });
                            setQueryParams({
                                ...queryParams,
                                mid: values.mood,
                                gender: encodeURIValue(values.gender, ['1', '2'], false),
                                age: encodeURIValue(values.age, ages, true),
                            });
                        }
                    }
                >
                    <FormItem label="情绪之海" name="mood" style={{ float: 'left' }}>
                        <Select
                            style={{ width: 100 }}
                            showSearch
                            optionFilterProp="label"
                            options={
                                initialState?.moods?.map((mood: Mood, index) => {
                                    return { value: mood.id, label: mood.name };
                                })
                            }
                        />
                    </FormItem>
                    <FormItem label="性别" name="gender" style={{ float: 'left' }}>
                        <Select
                            style={{ width: 125 }}
                            mode="multiple"
                            options={[
                                { value: '1', label: '男' },
                                { value: '2', label: '女' },
                            ]}
                        />
                    </FormItem>
                    <FormItem label="年龄" name="age" style={{ width: '38%', float: 'left' }}>
                        <Select
                            style={{ width: 430 }}
                            mode="multiple"
                            maxTagCount="responsive"
                            options={
                                ages.map((age, index) => {
                                    return { value: age, label: age };
                                })
                            }
                        />
                    </FormItem>
                    <FormItem label="socre" name="socre" style={{ float: 'left' }}>
                        <Input style={{ width: 200 }} disabled={true} />
                    </FormItem>
                    <Button type="primary"
                        onClick={() => {
                            setInitialQueryParams({
                                ...initialQueryParams,
                                socre: '',
                            });
                            userLastScore.current = '';
                            form.setFieldsValue({
                                socre: '',
                            });
                            refresh();
                        }}
                    >
                        刷新
                    </Button>
                    <FollowDiaryList />
                </Form>
            </Card >
            <Card
                style={{ marginTop: 5 }}
                bordered={false}
            >
                <List itemLayout="vertical">
                    <VirtualList
                        data={data}
                        height={ContainerHeight}
                        itemHeight={47}
                        itemKey="id"
                        onScroll={onScroll}
                    >
                        {(diary: Diary, index) => (
                            <div key={diary.id}>
                                <DiaryDetail
                                    diary={diary}
                                    index={index}
                                    actions={getActions(diary, index)}
                                    photos={diary.photos.map((photo) => photo.url ? photo.url : photo)}
                                    metaData={<List.Item.Meta
                                        avatar={
                                            diary.user.avatar ?
                                                <Avatar
                                                    src={diary.user.avatar.key
                                                        ? photoUrl + diary.user.avatar.key
                                                        : diary.user.avatar}
                                                    size={64} />
                                                :
                                                <Avatar
                                                    icon={<UserOutlined />}
                                                    size={64} />
                                        }
                                        title={
                                            <div>
                                                <UserDetail
                                                    userId={diary.album ? diary.album.uid || '' : diary.user.id}
                                                    title={diary.user.nickname} />
                                            </div>
                                        }
                                        description={
                                            <span>
                                                <Tag>#{index}</Tag>
                                                <Tag>{diary.user.id ? diary.user.age : diary.age}</Tag>
                                                <Tag>{diary.gender == '1' ? '男' : '女'}</Tag>
                                            </span>
                                        }
                                    />}
                                />
                            </div>
                        )}
                    </VirtualList>
                </List>
            </Card>
        </>
    );
};

export default MoodList;
