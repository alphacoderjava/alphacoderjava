import React from 'react';
import { Row, Col, Input, Button, Typography } from "antd";
import Carousel from "react-multi-carousel";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import SkeletonCard from "../../../../globalComponents/SkeletonCard";
import NoData from "../../../../globalComponents/NoData";
import { getVideos } from "../../../../server/config";
import { host } from "../../../../server/host";
import { pageTypesIds } from "../../../../contants";

import { setVideoUrl } from "../../../../redux/action";

import play_btn from "../../../../assets/img/play_btn.png";

const { Paragraph } = Typography;

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

const dummyList = [1, 2, 3, 4, 5, 6];

class VideoSlider extends React.Component {
    constructor() {
        super();
        this.state = {
            currentSlide: 1,
            disablePrev: true,
            disableNext: false,
            isFetching: true,
            list: [],
        }
        this.videoSlider = React.createRef();
    }

    handlePrev = () => {
        const { currentSlide } = this.state;
        if (currentSlide) {
            this.videoSlider.current.goToSlide(currentSlide - 1, true);
            this.setState({
                currentSlide: currentSlide - 1,
                disableNext: false,
            })
        } else {
            this.setState({
                disablePrev: true,
            })
        }
    }

    handleNext = () => {
        const { slidesToShow, totalItems } = this.videoSlider.current.state;
        const { currentSlide } = this.state;
        const itemsAndListLenDiff = totalItems - slidesToShow;

        if (currentSlide + 1 <= itemsAndListLenDiff) {
            this.videoSlider.current.goToSlide(currentSlide + 1, true);
            this.setState({
                currentSlide: currentSlide + 1,
                disablePrev: false,
            })
        } else {
            this.setState({
                disableNext: true,
            })
        }
    }

    getList = () => {
        getVideos().then((res) => {
            if (res && res.data) {
                this.setState({
                    list: res.data.data,
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
        this.getList();
    }


    render() {
        const {
            disablePrev,
            disableNext,
            list,
            isFetching,
        } = this.state;

        const { langs, lang } = this.props;
        const content = langs[lang];

        const hasData = list.length > 0;

        return (
            <div className="video-section">
                <div className="container slider video-slider">
                    <Row align="middle" justify="space-between" className="header-row site-border-bottom">
                        <Col>
                            <h3 className="heading">
                                {content.videos}
                            </h3>
                        </Col>
                        <Col>
                            <Row align="middle" gutter={[8]}>
                                <Col>
                                    <Link to={`/all-list/${pageTypesIds.videos}`}>
                                        {content.see_all}
                                    </Link>
                                </Col>
                                <Col>
                                    <Input.Group className="arrows-group">
                                        <Button className="arrow-btn" onClick={this.handlePrev} disabled={disablePrev}>
                                            <LeftOutlined />
                                        </Button>
                                        <Button className="arrow-btn" onClick={this.handleNext} disabled={disableNext}>
                                            <RightOutlined />
                                        </Button>
                                    </Input.Group>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Carousel ref={this.videoSlider} responsive={responsive} arrows={false}>
                        {
                            isFetching ? (
                                dummyList.map((item) => <SkeletonCard small key={item} />)
                            ) : (
                                    hasData ? (
                                        list.map((item) => (
                                            <div className="slider-item" key={item.id} onClick={() => this.props.setVideoUrl("https://www.youtube.com/watch?v=hV7kQ3y0HDU")}>
                                                <div className="poster-box">
                                                    <img alt="Img error" src={item.avatar} />
                                                    <Row className="play-box" justify="center" align="middle">
                                                        <Col>
                                                            <img src={play_btn} alt="Img error" />
                                                        </Col>
                                                    </Row>
                                                </div>
                                                <div className="content">
                                                    <Paragraph className="video-name" ellipsis={{ rows: 2 }}>
                                                        {item.first_name} {item.last_name}
                                                    </Paragraph>
                                                </div>
                                            </div>
                                        ))
                                    ) : <NoData />
                                )
                        }
                    </Carousel>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        langs: state.langs,
        lang: state.lang,
    }
}

export default connect(mapStateToProps, { setVideoUrl })(VideoSlider);