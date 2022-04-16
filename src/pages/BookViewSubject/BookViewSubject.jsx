import React from 'react';
import { Row, Col, Skeleton, Breadcrumb, Button } from 'antd';
import { withRouter, Link } from "react-router-dom";
import { connect } from 'react-redux';

import {
    getTextbookById,
} from "../../server/config";

import NoData from "../../globalComponents/NoData";
import { host } from "../../server/host";

import "./style.less";

class BookView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            data: null,
        }
    }

    getData = (id) => {
        getTextbookById(id).then((res) => {
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
        const dataId = this.props.match.params.id;

        if (dataId) {
            this.getData(dataId);
        }
    }

    render() {
        const {
            isFetching,
            data,
        } = this.state;

        const {
            langs,
            lang,
        } = this.props;

        const content = langs[lang];

        return (
            <div className="book-view container">
                <Breadcrumb separator="-" className="dynamic-breadcrumb">
                    <Breadcrumb.Item>
                        <Link to="/">
                            {content.breadcrumb_home}
                        </Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {content.breadcrumb_subject}
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Row className="mb-4 site-border-bottom">
                    <Col>
                        <h3 className="section-header">
                            {content.subjects}
                        </h3>
                    </Col>
                </Row>

                {
                    isFetching && (
                        <Row gutter={[24, 24]}>
                            <React.Fragment>
                                <Col flex="200px">
                                    <Skeleton.Image style={{ height: 200, width: "200px" }} />
                                </Col>
                                <Col flex="auto">
                                    <Skeleton active />
                                </Col>
                            </React.Fragment>
                        </Row>
                    )
                }


                {
                    data && (
                        <Row className="mb-4" gutter={[48]}>
                            <Col xs={24} md={12} lg={6}>
                                <Row gutter={[0, 16]}>
                                    <Col span={24}>
                                        <img src={`${host}${data.logo}`} alt="Img error" />
                                    </Col>
                                    <Col span={24}>
                                        <a target="_blank" href={`${host}${data.download}`}>
                                            <Button className="download-btn">
                                                {content.download}
                                            </Button>
                                        </a>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xs={24} md={12} lg={18}>
                                <h2 className="header">
                                    {data[`name${lang}`]}
                                </h2>

                                <p className="description" dangerouslySetInnerHTML={{ __html: data[`description${lang}`] }} />

                            </Col>
                        </Row>
                    )
                }

                {
                    !isFetching && !data && <NoData />
                }

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

export default withRouter(connect(mapStateToProps)(BookView));