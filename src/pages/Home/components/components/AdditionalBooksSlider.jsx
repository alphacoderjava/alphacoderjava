import React from 'react';
import { Row, Col, Input, Button, Typography } from "antd";
import Carousel from "react-multi-carousel";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";

import { LeftOutlined, RightOutlined, FacebookOutlined, TwitterOutlined, InstagramOutlined } from '@ant-design/icons';

import SkeletonCard from "../../../../globalComponents/SkeletonCard";
import NoData from "../../../../globalComponents/NoData";
import { getBooks } from "../../../../server/config";
import { host } from "../../../../server/host";
import { pageTypesIds } from '../../../../contants';

const { Paragraph } = Typography;

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5
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

const dummyList = [1, 2, 3, 4];

class AdditionalBooksSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 1,
            disablePrev: true,
            disableNext: false,
            isFetching: true,
            list: [],
        }
        this.addSubjectSlider = React.createRef();
    }

    handlePrev = () => {
        const { currentSlide } = this.state;
        if (currentSlide) {
            this.addSubjectSlider.current.goToSlide(currentSlide - 1, true);
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
        const { slidesToShow, totalItems } = this.addSubjectSlider.current.state;
        const { currentSlide } = this.state;
        const itemsAndListLenDiff = totalItems - slidesToShow;

        if (currentSlide + 1 <= itemsAndListLenDiff) {
            this.addSubjectSlider.current.goToSlide(currentSlide + 1, true);
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
        getBooks().then((res) => {
            if (res && res.data && res.data.numberOfElements) {
                this.setState({
                    list: res.data.content,
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
            <div className="container slider subject-slider">
                <Row align="middle" justify="space-between" className="header-row site-border-bottom">
                    <Col>
                        <h3 className="heading">
                            {content.books}
                        </h3>
                    </Col>
                    <Col>
                        <Row align="middle" gutter={[8]}>
                            <Col>
                                <Link to={`/all-list/${pageTypesIds.books}`}>
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
                <Carousel ref={this.addSubjectSlider} responsive={responsive} arrows={false}>
                    {
                        isFetching && (
                            dummyList.map((item) => <SkeletonCard key={item} />)
                        )
                    }
                    {
                        hasData ? (
                            list.map((item) => (
                                <div className="slider-item" key={item.id}>
                                    <Link to={`/book-view/${item.id}`}>
                                        <div className="content">
                                            <Paragraph className="subject-name">
                                                {item[`name${lang}`]}
                                            </Paragraph>
                                        </div>
                                        <img alt="Img error" src={`${host}${item.logo}`} />
                                    </Link>
                                    <div className="social-links site-border-left site-border-right site-border-bottom">
                                        <Row justify="end" gutter={[16]}>
                                            <Col>
                                                <Link to="/">
                                                    <FacebookOutlined />
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Link to="/">
                                                    <TwitterOutlined />
                                                </Link>
                                            </Col>
                                            <Col>
                                                <Link to="/">
                                                    <InstagramOutlined />
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            ))
                        ) : <NoData />
                    }
                </Carousel>
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

export default connect(mapStateToProps)(AdditionalBooksSlider);