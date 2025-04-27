import React, { useState, useEffect } from 'react';
import { Modal, Card, Tooltip, Tag, message } from 'antd';
import { request } from '@umijs/max';
import AlbumDetail from '../AlbumDetail';
import { Album } from '../data';

// type Album = {
//     albumId: string;
//     uid: string;
//     updateTime: string;
//     createTime: string;
// }

const AlbumList: React.FC<{ uid: string }> = ({ uid }) => {

    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setAlbums([]);
        setOpen(false);
    };

    const [albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {
        if (open) {
            request("/yiguan/listAlbumsByUserId", {
                params: { 'uid': uid },
                skipErrorHandler: true,
            }).then(function (res) {
                if (res.code == 1) {
                    setAlbums(res.data);
                } else {
                    message.error(res.message);
                }
            });
        }
    }, [open]);

    return (
        <>
            <a onClick={showModal}>
                {uid}
            </a>
            <Modal
                width={'80%'}
                open={open}
                title={albums.length}
                onCancel={handleCancel}
                footer={(_, { OkBtn, CancelBtn }) => (
                    <></>
                )}
            >
                <Card
                    style={{ marginTop: 5 }}
                    bordered={false}
                >
                    {albums.map((album, index) => (
                        <AlbumDetail album={{ id: album.id, }} title={album.title || album.id} uid={uid} />
                    ))}
                </Card>
            </Modal>
        </>
    );
};

export default AlbumList;