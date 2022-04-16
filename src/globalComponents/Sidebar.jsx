import React, { useState } from 'react';
import { Drawer, Menu, Button } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { HashLink } from 'react-router-hash-link';

const Sidebar = (props) => {
    const [visible, setVisible] = useState(false);
    const content = props.content;

    const showDrawer = () => {
        setVisible(true);
    }

    const closeDrawer = () => {
        setVisible(false);
    }
    return (
        <div className="hidden-md hidden-lg sidebar">
            <Button onClick={showDrawer}>
                <MenuOutlined />
            </Button>
            <Drawer
                title={content.menu}
                placement="right"
                closable
                onClose={closeDrawer}
                visible={visible}
            >
                <Menu mode="inline" onClick={closeDrawer}>
                    <Menu.Item>
                        <HashLink smooth to="/#about-education">
                            <p>{content.menu_about_education}</p>
                        </HashLink>
                    </Menu.Item>
                    <Menu.Item>
                        <HashLink smooth to="/#for-teachers">
                            <p>{content.menu_for_teachers}</p>
                        </HashLink>
                    </Menu.Item>
                    <Menu.Item>
                        <HashLink smooth to="/#pupils">
                            <p>{content.menu_for_pupils}</p>
                        </HashLink>
                    </Menu.Item>
                    <Menu.Item>
                        <HashLink smooth to="/#for-parents">
                            <p>{content.menu_for_parents}</p>
                        </HashLink>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to="/site-map">
                            {content.site_map}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/rules'>
                            {content.rules}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/about-us'>
                            {content.about_us}
                        </Link>
                    </Menu.Item>
                    <Menu.Item>
                        <Link to='/help'>
                            {content.help}
                        </Link>
                    </Menu.Item>
                </Menu>
            </Drawer>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        content: state.langs[state.lang],
    }
}
export default connect(mapStateToProps)(Sidebar);