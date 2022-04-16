import React from 'react';
import { Card, Skeleton } from 'antd';

const SkeletonCard = (props) => {
    const isSmall = props.small;

    return (
        <Card style={{
            width: isSmall ? 150 : 250,
        }}>
            <Skeleton active />
        </Card>
    );
}

export default SkeletonCard;