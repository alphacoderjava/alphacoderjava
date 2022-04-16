import React from 'react';
import { Row, Col, Breadcrumb, Divider, Tree } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';

import ArticleSidebar from "../../globalComponents/ArticleSidebar";

import "../pages.less";

const SiteMap = (props) => {
    const { langs, lang } = props;
    const content = langs[lang];

    return (
        <div className="article container">
            <Breadcrumb separator="-" className="dynamic-breadcrumb">
                <Breadcrumb.Item>
                    <Link to="/">
                        {content.breadcrumb_home}
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    {content.site_map}
                </Breadcrumb.Item>
            </Breadcrumb>

            <Row className="mb-4" gutter={[48]}>
                <Col xs={24} md={12} lg={6} className="visble-md visible-lg">
                    <ArticleSidebar />
                </Col>
                <Col xs={24} lg={18}>
                    <h2 className="header">
                        {content.sitemap_header}
                    </h2>

                    <Divider />

                    <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        defaultExpandedKeys={['0-0-0']}
                        treeData={[
                            {
                                title: content.site_map,
                                key: '0-0',
                                children: [],
                            },
                            {
                                title: content.rules,
                                key: '0-1',
                                children: [],
                            },
                            {
                                title: content.about_us,
                                key: '0-2',
                                children: [],
                            },
                            {
                                title: content.help,
                                key: '0-3',
                                children: [],
                            },
                        ]}
                    />
                </Col>
            </Row>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        langs: state.langs,
        lang: state.lang,
    }
}

export default withRouter(connect(mapStateToProps)(SiteMap));