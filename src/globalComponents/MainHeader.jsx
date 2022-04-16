import React from 'react';
import { Row, Col, Input, Select, Button } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import MainNavbar from './components/MainNavbar';
import Sidebar from './Sidebar';
import logo_text from "../assets/img/logo_text.png";

const { Option } = Select;

const MainHeader = (props) => {
    const { langs, lang } = props;
    const content = langs[lang];

    return (
        <div className="site-border-bottom">

            <div className="container main-header">
                <Row align="middle" justify="space-between" className="logo-row">
                    <Col>
                        <Link to="/">
                            <img src={logo_text} alt="Img error" className="site-logo" />
                        </Link>
                    </Col>
                    <Col flex="600px" className="hidden-md hidden-sm hidden-xs">
                        <Input.Group compact>
                            <Select className="search-select" placeholder={content.search_select_placeholder}>
                                <Option value="Option1">Option1</Option>
                                <Option value="Option2">Option2</Option>
                            </Select>
                            <Input placeholder={content.search_placeholder} />
                            <Button className='btn'>
                                {content.search}
                            </Button>
                        </Input.Group>
                    </Col>
                    <Col>
                        <Sidebar />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MainNavbar />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(MainHeader);