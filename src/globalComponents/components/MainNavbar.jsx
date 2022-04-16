import React from 'react';
import { Menu, Row, Col } from 'antd';
import { connect } from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';

import "../component.less";

const MainNavbar = (props) => {
    const content = props.langs[props.lang];
    return (
        <Row justify="space-between" className="main-navbar hidden-sm hidden-xs">
            <Col>
                <Menu mode="horizontal">
                    <Menu.Item key="one">
                        <Link smooth to="/#about-education">
                            {content.menu_about_education}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="two">
                        <Link smooth to="/#for-teachers">
                            {content.menu_for_teachers}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="three">
                        <Link smooth to="/#pupils">
                            {content.menu_for_pupils}
                        </Link>
                    </Menu.Item>
                    {/* <Menu.Item key="four">
                        <Link smooth to="/#books">
                            {content.menu_books}
                        </Link>
                    </Menu.Item> */}
                    <Menu.Item key="five">
                        <Link smooth to="/#for-parents">
                            {content.menu_for_parents}
                        </Link>
                    </Menu.Item>
                </Menu>
            </Col>
        </Row>
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(MainNavbar);