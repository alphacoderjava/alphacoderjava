import React from 'react';
import { Row, Col, Button } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

const Rules = (props) => {
    const { langs, lang } = props;
    const content = langs[lang];

    return (
        <div className="article container">
            <Row gutter={[0, 8]} >
                <Col span={24}>
                    <Link to="site-map">
                        <Button type="text" className="menu-btn">
                            {content.site_map}
                        </Button>
                    </Link>
                </Col>
                <Col span={24}>
                    <Link to="rules">
                        <Button type="text" className="menu-btn">
                            {content.rules}
                        </Button>
                    </Link>
                </Col>
                <Col span={24}>
                    <Link to="/about-us">
                        <Button type="text" className="menu-btn">
                            {content.about_us}
                        </Button>
                    </Link>
                </Col>
                <Col span={24}>
                    <Link to="help">
                        <Button type="text" className="menu-btn">
                            {content.help}
                        </Button>
                    </Link>
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

export default withRouter(connect(mapStateToProps)(Rules));