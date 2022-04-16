import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import SkeletonCard from "../../../globalComponents/SkeletonCard";
import { host } from "../../../server/host";
import { getForTeachers, getVideos } from "../../../server/config";
import { setVideoUrl } from "../../../redux/action";

import play_btn from "../../../assets/img/play_btn.png";

const { Paragraph } = Typography;

const dummyList = [1, 2, 3, 4];

class ForTeachers extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: true,
            list: [],
            videos: [],
        }
    }

    getData = () => {
        // getVideos(0, 4).then((res) => {
        //     if (res && res.data && res.data.numberOfElements) {
        //         this.setState({
        //             videos: res.data.content,
        //             isFetching: false,
        //         })
        //     } else {
        //         this.setState({
        //             isFetching: false,
        //         })
        //     }
        // })
        getForTeachers(0, 6).then((res) => {
            if (res && res.data && res.data) {
                // const mainList = res.data.content.filter((obj, index) => index < 4);
                // const list = res.data.content.filter((obj, index) => index >= 4);
                const mainList = res.data.data;
                const list = res.data.data;

                this.setState({
                    list: list,
                    mainList,
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
        this.getData();
    }

    render() {
        const { list, videos, mainList, isFetching } = this.state;
        const { lang } = this.props;
        const content = this.props.langs[this.props.lang];

        const hasData = list && list.length ? true : false;

        return (
            <div className="container section for-teachers" id="for-teachers" >
                <Row justify="center" className="section-heading-box">
                    <Col>
                        <h3 className="section-header">
                            {content.menu_for_teachers}
                        </h3>
                        <h5 className="section-subheader">
                            {content.subheader_for_teachers}
                        </h5>
                    </Col>
                </Row>

                {
                    isFetching && (
                        <Card className="cards-box">
                            <Row gutter={[8, 8]}>
                                <Col xs={24} lg={12}>
                                    <SkeletonCard />
                                </Col>

                                <Col md={24} lg={12}>
                                    <Row gutter={[8, 8]}>
                                        {
                                            dummyList.map((i) => <SkeletonCard key={i} />)
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    )
                }

                {
                    hasData && (
                        <Card className="cards-box">
                            <Row gutter={[8, 8]}>
                                <Col xs={24} lg={12}>
                                    <Row gutter={[8, 8]}>
                                        {
                                            mainList.map((item, index) => (
                                                <Col xs={24} sm={12} lg={12} key={item.id}>
                                                    <Link to={`/article/${item.link}`}>
                                                        <Card className="teacher-card">
                                                            {/* <img alt="Img error" src={`${host}${item.logo}`} /> */}
                                                            <img alt="Img error" src={item.avatar} />
                                                            <div className="content">
                                                                <div className="item-count">
                                                                    155 items
                                                                </div>
                                                                <div className="order-number">
                                                                    {index + 1 < 10 ? `0${index + 1}` : index}
                                                                </div>
                                                                <Paragraph className="heading" ellipsis={{ rows: 3 }}>
                                                                    {item[`title${lang}`]}
                                                                </Paragraph>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))
                                        }

                                        {/* {
                                            videos.map((item, index) => (
                                                <Col xs={24} sm={12} key={item.id}>
                                                    <div className="poster-box" onClick={() => this.props.setVideoUrl(item.video)}>
                                                        <Row className="play-box" justify="center" align="middle">
                                                            <Col>
                                                                <img src={play_btn} alt="Img error" />
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <Card className="video-card">
                                                        <img alt="Img error" src={`${host}${item.logo}`} />
                                                        <div className="content">
                                                            <div className="item-count">
                                                                155 items
                                                            </div>
                                                            <div className="order-number">
                                                                {index + 1 < 10 ? `0${index + 1}` : index}
                                                            </div>
                                                            <p className="heading">
                                                                {item[`title${lang}`]}
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </Col>
                                            ))
                                        } */}
                                    </Row>
                                </Col>

                                <Col md={24} lg={12}>
                                    <Row gutter={[8, 8]}>
                                        {
                                            list.map((item, index) => (
                                                <Col xs={24} md={12} lg={12} key={item.id}>
                                                    <Link to={`/article/${item.link}`}>
                                                        <Card className="teacher-card">
                                                            <img alt="Img error" src={item.avatar} />
                                                            <div className="content">
                                                                <div className="item-count">
                                                                    155 items
                                                                </div>
                                                                <div className="order-number">
                                                                    {index + 1 < 10 ? `0${index + 1}` : index}
                                                                </div>
                                                                <Paragraph className="heading" ellipsis={{ rows: 3 }}>
                                                                    {item[`title${lang}`]}
                                                                </Paragraph>
                                                            </div>
                                                        </Card>
                                                    </Link>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    )
                }
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

export default connect(mapStateToProps, { setVideoUrl })(ForTeachers);