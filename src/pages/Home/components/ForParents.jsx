import React from 'react';
import { Row, Col, Button, Skeleton } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import parent_1 from "../../../assets/img/parent_1.png";
import parent_2 from "../../../assets/img/parent_2.png";
import parent_triangle from "../../../assets/img/parent_triangle.png";

import { getForParents } from "../../../server/config";

const dummyList = [1, 2, 3, 4];

class ForTeachers extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            main: null,
            isFetching: true,
        }
    }

    getData = () => {
        getForParents().then((res) => {
            if (res && res.data && res.data) {
                this.setState({
                    isFetching: false,
                    list: res.data.data,
                })
            }
        })
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        const { list, isFetching } = this.state;
        const { lang } = this.props;

        const content = this.props.langs[this.props.lang];
        const hasData = list && list.length ? true : false;

        return (
            <div className="container section for-parents-section" id="for-parents" >
                <Row justify="center" className="section-heading-box">
                    <Col>
                        <h3 className="section-header">
                            {content.menu_for_parents}
                        </h3>
                        <h5 className="section-subheader">
                            {content.subheader_for_parents}
                        </h5>
                    </Col>
                </Row>
                <Row gutter={[16]}>
                    {
                        isFetching && (
                            dummyList.map((item) => (
                                <Col xs={24} md={12} lg={6} key={item}>
                                    <Skeleton active />
                                </Col>
                            ))
                        )
                    }
                    {
                        !isFetching && hasData && (
                            list.map((item, index) => {
                                const isOdd = index % 2 === 0;

                                return (
                                    <Col xs={24} md={12} lg={6} key={item.id}>
                                        <div className="parents-card">
                                            <Row className="content site-border" justify="center" align="middle">
                                                <div className="bg-icon">
                                                    <Col>
                                                        <img src={`${isOdd ? parent_1 : parent_2}`} alt="Img error" />
                                                    </Col>
                                                </div>
                                                <Col>
                                                    <h4 className="header">{item[`first_name`]}</h4>
                                                </Col>
                                            </Row>
                                            <Row className={`action ${isOdd ? "" : "second"}`} justify="center" align="middle">
                                                <img src={item.avatar} alt="Img error" />
                                                <Col span={20}>
                                                    <Link to={`/article/${item.email}`}>
                                                        <Button className="more-btn">
                                                            {content.more}
                                                            sjhbsjfh
                                                        </Button>
                                                    </Link>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                )
                            })
                        )
                    }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(ForTeachers);