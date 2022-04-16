import React from 'react';
import { Row, Col, Input, Button, Typography, Form, message } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

import { subscribeUserEmail } from "../server/config";
import logo_text from "../assets/img/logo_text.png";
import talim_markazi_logo from "../assets/img/talim_markazi_logo.png";
import xalq_talimi_logo from "../assets/img/xalq_talimi_logo.png";

import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    UpOutlined,
} from '@ant-design/icons';

const { Paragraph } = Typography;

const MainFooter = (props) => {
    const content = props.langs[props.lang];

    const onFinish = (values) => {
        subscribeUserEmail({
            value: values.email,
        }).then((res) => {
            if (res && res.data) {
                message.success('Success');
            } else {
                message.error("Error happened");
            }
        })
    }

    return (
        <React.Fragment>
            <div className="site-footer site-border-top site-border-bottom">
                <div className="container">
                    <Row>
                        <Col xs={24} lg={8} className="first-col pt-4 pr-5 site-border-right">
                            <Link to="/" className="mr-2">
                                <img className="mb-3 site-logo" src={logo_text} alt="Img error" />
                            </Link>

                            <p className="info-text">
                                Tarbiya biz uchun yo hayot – yo mamot, yo najot – yo halokat, yo saodat – yo falokat masalasidir
                            </p>

                            <div className="social-links">
                                <Row gutter={[16]}>
                                    <Col className="pl-0">
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

                        <Col xs={24} lg={8} className="second-col pt-4 px-5 site-border-right">
                            <h3 className="header mb-0">Tarbiyam.uz</h3>

                            <Paragraph className="subheader" ellipsis={{ rows: 5 }}>
                                {content.be_aware_from_news}
                            </Paragraph>

                            <Button className="email-btn">
                                <a target="_blank" href="https://t.me/edurtm_uz">
                                    {content.subscribe}
                                </a>
                            </Button>
                            <Row className="mt-4" align="middle" justify="center">
                                <Col xs={24} sm={24} md={12}>
                                    <img src={xalq_talimi_logo} alt="Image error" />
                                </Col>
                                <Col xs={24} sm={24} md={12}>
                                    <img src={talim_markazi_logo} alt="Image error" />
                                </Col>
                            </Row>

                            {/* <Form
                                name="basic"
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                            type: 'email'
                                        },
                                    ]}
                                >
                                    <Input className="email-input" placeholder={content.enter_email} />
                                </Form.Item>

                                <Form.Item>
                                    <Button className="email-btn" htmlType="submit">
                                        {content.subscribe}
                                    </Button>
                                </Form.Item>
                            </Form> */}
                        </Col>

                        <Col xs={24} lg={8} className="third-col pt-3 px-5">
                            <Row>
                                <Col span={12}>
                                    <h4 className="col-header">{content.menu}</h4>
                                    <Link to="/">
                                        <p>{content.menu_home}</p>
                                    </Link>
                                    <HashLink smooth to="/#about-education">
                                        <p>{content.menu_about_education}</p>
                                    </HashLink>
                                    <HashLink smooth to="/#for-teachers">
                                        <p>{content.menu_for_teachers}</p>
                                    </HashLink>
                                    <HashLink smooth to="/#pupils">
                                        <p>{content.menu_for_pupils}</p>
                                    </HashLink>
                                    {/* <HashLink smooth to="/#books">
                                        <p>{content.menu_books}</p>
                                    </HashLink> */}
                                    <HashLink smooth to="/#for-parents">
                                        <p>{content.menu_for_parents}</p>
                                    </HashLink>
                                </Col>
                                <Col span={12}>
                                    <h4 className="col-header">{content.info}</h4>
                                    <Link to="/site-map">
                                        <p>{content.site_map}</p>
                                    </Link>
                                    <Link to="/rules">
                                        <p>{content.rules}</p>
                                    </Link>
                                    <Link to="/about-us">
                                        <p>{content.about_us}</p>
                                    </Link>
                                    <Link to="/help">
                                        <p>{content.help}</p>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
            <div className="container py-4 bottom-footer">
                <Row justify="space-between" align="middle">
                    <Col>
                        <Link to="/" className="mr-2">
                            Tarbiyam.uz
                        </Link>
                        All rights reserved.
                    </Col>
                    <Col>
                        <HashLink smooth to="#main-carousel">
                            <Row justify="center" className="to-top">
                                <Col span={24}>
                                    <UpOutlined />
                                </Col>
                                <Col span={24}>
                                    {content.go_to_up}
                                </Col>
                            </Row>
                        </HashLink>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        </React.Fragment >
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(MainFooter);