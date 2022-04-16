import React from 'react';
import { Row, Col, Breadcrumb, Divider } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import ArticleSidebar from "../../globalComponents/ArticleSidebar";

import { getPageById } from "../../server/config";

import NoData from '../../globalComponents/NoData';

import "../pages.less";

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isFetching: true,
        }
    }

    getData = (id) => {
        getPageById(id).then((res) => {
            if (res && res.data) {
                this.setState({
                    data: res.data,
                    isFetching: false,
                })
            } else {
                this.setState({
                    isFetching: false,
                })
            }
        })
    }

    componentDidMount() {
        const articleId = this.props.match.params.id;
        if (articleId) {
            this.getData(articleId);
        } else {
            this.setState({ isFetching: false });
        }
    }

    render() {
        const { data } = this.state;
        const { langs, lang } = this.props;
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
                        {content.breadcrumb_article}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row className="mb-4" gutter={[48]}>
                    <Col xs={24} md={12} lg={6} className="visble-md visible-lg">
                        <ArticleSidebar />
                    </Col>

                    <Col xs={24} lg={18}>
                        {
                            data ? (
                                <React.Fragment>
                                    <h2 className="header">
                                        {data[`title${lang}`]}
                                    </h2>

                                    <Divider />

                                    <p className="description" dangerouslySetInnerHTML={{ __html: data[`body${lang}`] }} />

                                </React.Fragment>
                            ) : <NoData />
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        langs: state.langs,
        lang: state.lang,
    }
}

export default withRouter(connect(mapStateToProps)(Article));