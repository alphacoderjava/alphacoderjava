import React from 'react';
import { Row, Col, Typography } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import { host } from "../../../server/host";

const { Paragraph } = Typography;

const BookCard = (props) => {
    const { lang } = props;
    const list = props.list;

    return (
        <Row gutter={[24, 24]}>
            {
                list.map((item) => (
                    <Col xs={24} sm={12} md={8} lg={6} className="book-card-item" key={item.id}>
                        <Link to={`/book-view/${item.id}`}>
                            <div className="content-box">
                                <div className="content">
                                    <Paragraph className="subject-name">
                                        {item[`name${lang}`]}
                                    </Paragraph>
                                </div>
                                <img alt="Img error" src={`${host}${item.logo}`} />
                            </div>
                        </Link>
                        <div className="social-links site-border-left site-border-right site-border-bottom">
                            <Row justify="end" gutter={[16]}>
                                <Col>
                                    <Link to="/">
                                        <FacebookOutlined />
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to="/">
                                        <TwitterOutlined />
                                    </Link>
                                </Col>
                                <Col>
                                    <Link to="/">
                                        <InstagramOutlined />
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                ))
            }
        </Row >
    )
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
    }
}

export default connect(mapStateToProps)(BookCard);