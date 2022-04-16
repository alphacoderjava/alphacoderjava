import React from 'react';
import { Button, Row, Col, Select } from 'antd';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setLang } from "../redux";
import { userLang, defaultLang } from "../contants";
import { getCookie, setCookie } from "../utils/useCookie";
// import { EyeOutlined } from '@ant-design/icons';

const { Option } = Select;

class TopNavbar extends React.Component {
    constructor() {
        super();
        this.state = {
            lang: this.getLang(),
        }
    }

    getLang = () => {
        const lang = getCookie(userLang);
        if (!lang) {
            setCookie(userLang, defaultLang);
        }
        return lang ? lang : defaultLang;
    }

    changeLang = (value) => {
        this.setState({
            lang: value,
        })
        setCookie(userLang, value);
        this.props.setLang(value);
    }

    setGlobalLang = () => {
        let lang = getCookie(userLang);
        if (!lang) {
            lang = defaultLang;
            setCookie(userLang, lang);
        }
        this.props.setLang(lang);
    }

    componentDidMount() {
        this.setGlobalLang();
    }

    render() {
        const { lang } = this.state;
        const content = this.props.langs[lang];

        return (
            <div className="top-navbar site-border-bottom" id="top-navbar">
                <div className="container">
                    <Row justify="space-between">
                        <Col>
                            <Link to="/site-map">
                                <Button type="text" style={{ paddingLeft: 0 }}>
                                    {content.site_map}
                                </Button>
                            </Link>
                        </Col>

                        <Row justify="end">
                            {/* <Col className="hidden-sm hidden-xs">
                                <Button type="text" onClick={this.handleDisabilityChange}>
                                    <EyeOutlined />
                                    {content.disabilities}
                                </Button>
                            </Col> */}
                            <Col className="hidden-sm hidden-xs">
                                <Link to="/rules">
                                    <Button type="text">
                                        {content.rules}
                                    </Button>
                                </Link>
                            </Col>
                            <Col className="hidden-sm hidden-xs">
                                <Link to="/about-us">
                                    <Button type="text">
                                        {content.about_us}
                                    </Button>
                                </Link>
                            </Col>
                            <Col className="hidden-sm hidden-xs">
                                <Link to="/help">
                                    <Button type="text">
                                        {content.help}
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Select
                                    className="lang-selection"
                                    placeholder="Select lang"
                                    onChange={this.changeLang}
                                    defaultValue={lang}
                                >
                                    <Option value="Uz">Uz</Option>
                                    <Option value="Ru">Ru</Option>
                                    {/* <Option value="En">En</Option> */}
                                </Select>
                            </Col>
                        </Row>
                    </Row>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps, { setLang })(TopNavbar);
