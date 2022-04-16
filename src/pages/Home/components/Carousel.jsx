import React from 'react';
import { Button, Row, Col, Skeleton, Typography } from 'antd';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import { getMainCarousel } from "../../../server/config";
import { host } from "../../../server/host";

const { Paragraph } = Typography;
class MainCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: true,
            list: [],
        }
        this.carousel = React.createRef();
    }

    handlePrevClick = () => {
        this.carousel.current.slick.innerSlider.slickPrev();
    }

    handleNextClick = () => {
        console.log(this.carousel);
        this.carousel.current.slick.innerSlider.slickNext();
    }

    getData = () => {
        getMainCarousel().then((res) => {
            if (res && res.data && res.data.length) {
                this.setState({
                    list: res.data,
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
        const { isFetching, list } = this.state;
        const { langs, lang } = this.props;
        const content = langs[lang];

        if (isFetching) {
            return <Skeleton active />
        }

        return (
            <div className="main-carousel" id="main-carousel">
                <Row >
                    {
                        list.map((item) => (
                            <Col xs={24} md={12} lg={6} className="carousel-item" key={item.id}>
                                <div className="content-box container">
                                    <Row className="content">
                                        <Col>
                                            <Paragraph className="header" ellipsis={{ rows: 3 }}>
                                                {item[`title${lang}`]}
                                            </Paragraph>
                                        </Col>
                                    </Row>
                                    <Link to={`/article/${item.link}`}>
                                        <Button className="more-btn">
                                            {content.more}
                                        </Button>
                                    </Link>
                                </div>
                                <img src={`${host}${item.logo}`} alt="Img error" />
                            </Col>
                        ))
                    }
                </Row>
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

export default connect(mapStateToProps)(MainCarousel);