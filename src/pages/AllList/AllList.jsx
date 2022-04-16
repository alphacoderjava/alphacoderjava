import React from 'react';
import { Row, Col, Card, Skeleton, Pagination } from 'antd';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';

import {
    getTextbooks,
    getVideos,
    getBooks,
    getAudios,
} from "../../server/config";

import DynamicBreadcrumb from "../../globalComponents/DynamicBreadcrumb";
import ListByType from "./components/ListByType";
import NoData from "../../globalComponents/NoData";

import "./style.less";

const dummyList = [1, 2, 3, 4, 5, 6, 7, 8];

class AllList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            list: [],
            fetchFunction: null,
            currentPage: 1,
            totalElements: 0,
            dataType: null,
            header: null,
        }
    }

    handlePaginationChange = (page) => {
        console.log(page);
        this.setState({
            currentPage: page,
        });
    };

    fetchList = () => {
        const { fetchFunction, currentPage, dataType } = this.state;

        let dataSize = 16;

        if (dataType === "video") {
            dataSize = 36;
        } else if (dataType === "audio") {
            dataSize = 10;
        }

        if (fetchFunction) {
            fetchFunction(currentPage - 1, dataSize).then((res) => {
                if (res && res.data && res.data.numberOfElements) {
                    this.setState({
                        isFetching: false,
                        list: res.data.content,
                        totalElements: res.data.totalElements,
                    })
                } else {
                    this.setState({ isFetching: false });
                }
            })
        }
    }

    clearifyPage = (id) => {
        switch (id) {
            case "1":
                this.setState({
                    fetchFunction: getTextbooks,
                    dataType: "book",
                    header: "subjects",
                }, () => this.fetchList());
                break;
            case "2":
                this.setState({
                    fetchFunction: getVideos,
                    dataType: "video",
                    header: "videos",
                }, () => this.fetchList());
                break;
            case "3":
                this.setState({
                    fetchFunction: getBooks,
                    dataType: "book",
                    header: "books",
                }, () => this.fetchList());
                break;
            case "4":
                this.setState({
                    fetchFunction: getAudios,
                    dataType: "audio",
                    header: "audios",
                }, () => this.fetchList());
                break;
            default:
                this.setState({
                    fetchFunction: null,
                }, () => this.fetchList());
                break;
        }
    }

    componentDidMount() {
        const pageTypeId = this.props.match.params.id;

        if (pageTypeId) {
            this.clearifyPage(pageTypeId);
        } else {
            this.setState({ isFetching: false });
        }
    }

    render() {
        const {
            isFetching,
            list,
            dataType,
            currentPage,
            totalElements,
            header,
        } = this.state;

        const {
            langs,
            lang,
        } = this.props;

        const pageHeader = langs[lang][header];


        const hasData = isFetching ? false : list.length > 0;

        return (
            <div className="all-list container">

                <DynamicBreadcrumb />

                <Row className="mb-4 site-border-bottom">
                    <Col>
                        <h3 className="section-header">
                            {pageHeader}
                        </h3>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    {
                        isFetching && (
                            dummyList.map((item) => (
                                <Col xs={24} md={12} lg={6} key={item}>
                                    <Card>
                                        <Skeleton active />
                                    </Card>
                                </Col>
                            ))
                        )
                    }
                </Row>

                {
                    hasData && <ListByType data={list} dataType={dataType} />
                }

                {
                    !isFetching && !hasData && (
                        <NoData />
                    )
                }

                {
                    !isFetching && hasData && (
                        <Row className="mt-5" justify="center">
                            <Col>
                                <Pagination
                                    current={currentPage}
                                    onChange={this.handlePaginationChange}
                                    className="all-list-pagination"
                                    total={totalElements}
                                />
                            </Col>
                        </Row>
                    )
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

export default withRouter(connect(mapStateToProps)(AllList));