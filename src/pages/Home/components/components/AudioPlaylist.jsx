import React from 'react';
import { Row, Col, Typography, Skeleton, Divider } from "antd";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";

import NoData from "../../../../globalComponents/NoData";
import { getAudios } from "../../../../server/config";
import { host } from "../../../../server/host";
import { pageTypesIds } from "../../../../contants";

const { Paragraph } = Typography;

class VideoSlider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            list: [],
        }
        this.videoSlider = React.createRef();
    }

    getList = () => {
        getAudios().then((res) => {
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
            list,
            isFetching,
        } = this.state;

        const { langs, lang } = this.props;
        const content = langs[lang];

        const hasData = list.length > 0;

        return (
            <div className="container slider audios">
                <Row align="middle" justify="space-between" className="header-row site-border-bottom">
                    <Col>
                        <h3 className="heading">
                            {content.audios}
                        </h3>
                    </Col>
                    <Col>
                        <Row align="middle" gutter={[8]}>
                            <Col>
                                <Link to={`/all-list/${pageTypesIds.audios}`}>
                                    {content.see_all}
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    {
                        isFetching ? (
                            <Skeleton active />
                        ) : (
                                hasData ? (
                                    list.map((item, index) => (
                                        <Col span={24} key={item.id}>
                                            <figure>
                                                <figcaption>
                                                    <Paragraph ellipsis={{ rows: 1 }}>
                                                        {item[`title${lang}`]}
                                                    </Paragraph>
                                                </figcaption>
                                                <audio preload="none" controls src={`${host}${item.audio}`}>
                                                    Your browser does not support the
                                                    <code>audio</code> element.
                                                </audio>
                                            </figure>
                                            {
                                                index !== list.length - 1 && <Divider />
                                            }
                                        </Col>
                                    ))
                                ) : <NoData />
                            )
                    }
                </Row>
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

export default connect(mapStateToProps)(VideoSlider);