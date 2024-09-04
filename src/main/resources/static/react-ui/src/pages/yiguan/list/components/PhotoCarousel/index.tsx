import React from 'react';
import { Carousel, Image } from 'antd';

type PhotoCarouselProps = {
    data: {
        content: React.ReactNode;
        updatedAt: number;
        avatar: string;
        owner: string;
        photos: string;
    };
};

const PhotoCarousel: React.FC<{ photos?: any[] }> = ({ photos }) => {
    // 确保photos是一个数组，否则在map函数中会出错  
    const carouselItems = photos ? photos.map((photo, index) => (
        <div key={index} style={{ position: 'relative', overflow: 'hidden', width: '100%', }}>
            <Image src={photo} style={imageStyle} height={'250px'} />
        </div>
    )) : null;

    // 定义图片的样式（如果需要的话）  
    const imageStyle = {
        // width: '100%', // 假设你想要图片宽度填满容器  
        // height: '100%', // 保持图片的原始宽高比  
        // 'object-fit': 'cover', // 根据父容器的尺寸裁剪和缩放图片，以填充整个容器，并保持长宽比例不变
    };

    // 如果photos数组存在且有元素，则渲染Carousel  
    if (photos && photos.length > 0) {
        return (
            <Image.PreviewGroup>
                <Carousel arrows infinite={false}>
                    {carouselItems}
                </Carousel>
            </Image.PreviewGroup>
        );
    }

    // 如果photos数组为空或不存在，则可以选择渲染一个加载中提示、空状态或其他UI元素  
    return null;
};

export default PhotoCarousel;