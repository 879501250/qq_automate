import React, { useState, useRef } from 'react';
import { Input, Modal, Card, List, Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { User, } from '../../data';
import { request } from '@umijs/max';
import VirtualList from 'rc-virtual-list';
import UserDetail from '../UserDetail';
import { formatTimestamp } from '../../service';

type Comment = {
    id: string;
    did: string;
    text: string;
    nickname: string;
    isLz: boolean;
    isSelf: boolean;
    gender: number;
    replyToNickname: string;
    createTime: number;
    score: string;
    giftedCloverNum: number;
    replyToUid: string;
    isGiftedClover: boolean;
    user: User;
    replyToUser?: User;
    ipLocation: string;
}

const listUrl = 'https://api.jijigugu.club/comment/list';
const photoUrl = 'http://photo.pcdn.jijigugu.club/';
const ContainerHeight = 400;

const { TextArea } = Input;

const CommentList: React.FC<{ did: string, tigger: JSX.Element }> = ({ did, tigger }) => {


    const [open, setOpen] = useState(false);
    const showModal = () => {
        lastScore.current = null;
        appendData();
        setOpen(true);
    };
    const handleCancel = () => {
        setComments([]);
        setOpen(false);
    };

    const [comments, setComments] = useState<Comment[]>([]);
    const lastScore: any = useRef();
    const appendData = () => {
        request(listUrl, {
            params: { 'did': did, 'lastScore': lastScore.current, },
            skipErrorHandler: true,
        }).then(function (res) {
            if (res.code == 0) {
                if (res.lastScore) {
                    lastScore.current = res.lastScore;
                    setComments(comments.concat(res.data));
                }
            }
        });
    };

    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };

    const getActions = (comment: Comment, index: number): React.ReactNode[] => {
        const actions: React.ReactNode[] = [];
        actions.push(
            <Tag color='white' style={{ color: 'black' }}>{comment.id}</Tag>
        );
        actions.push(
            <Tag color='white' style={{ color: 'black' }}>{formatTimestamp(comment.createTime * 1000)}</Tag>
        );
        actions.push(
            <Tag color='white' style={{ color: 'black' }}>{comment.gender == 1 ? "男" : "女"}</Tag>
        );
        if (comment.ipLocation != '') {
            actions.push(
                <Tag color='white' style={{ color: 'black' }}>{comment.ipLocation}</Tag>
            );
        }
        actions.push(
            <a>回复</a>
        );
        actions.push(
            <a>私信</a>
        );
        return actions;
    };

    return (
        <>
            <a onClick={showModal} style={{ color: 'inherit' }}>
                {tigger}
            </a>
            <Modal
                width={'50%'}
                open={open}
                title={did}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <></>
                )}
            >
                <Card
                    bordered={false}
                >
                    <List itemLayout="vertical">
                        <VirtualList
                            data={comments}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="id"
                            onScroll={onScroll}
                        >
                            {(comment: Comment, index) => (
                                <List.Item
                                    key={comment.id}
                                    actions={getActions(comment, index)}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                src={
                                                    comment.user.avatar ?
                                                        (photoUrl + comment.user.avatar.key) : ''
                                                }
                                                icon={<UserOutlined />}
                                                size="small"
                                            />
                                        }
                                        title={
                                            comment.user.id ?
                                                <div>
                                                    <UserDetail
                                                        userId={comment.user.id}
                                                        title={comment.nickname}
                                                    />
                                                </div>
                                                :
                                                <div>{comment.nickname}</div>
                                        }
                                    />
                                    <div>
                                        {comment.replyToNickname != "" &&
                                            <span>
                                                回复
                                                <UserDetail
                                                    userId={comment.replyToUid}
                                                    title={" " + comment.replyToNickname}
                                                />
                                                ：
                                            </span>
                                        }
                                        <span style={{ whiteSpace: 'pre-line' }}>{comment.text}</span>
                                    </div>
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </Card>
                <TextArea rows={3} />
            </Modal>
        </>
    );
};

export default CommentList;