import React from 'react';
import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import "../home.less";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loader = () => (
    <div className="loader-container">
        <Spin indicator={antIcon} />
    </div>
)

export default Loader;