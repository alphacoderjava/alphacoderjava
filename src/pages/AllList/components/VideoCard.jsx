import React from 'react';
import { Row, Col, Typography } from 'antd';
import { connect } from 'react-redux';

import { setVideoUrl } from "../../../redux/action";
import { host } from "../../../server/host";

import play_btn from "../../../assets/img/play_btn.png";

const { Paragraph } = Typography;

const VideoCard = (props) => {
    const { lang } = props;
    const list = props.list;

    return (
        <Row gutter={[24, 24]}>
            {
                list.map((item) => (
                    <Col xs={24} sm={12} lg={6} className="video-card-item" key={item.id} onClick={() => props.setVideoUrl(item.video)}>
                        <div className="poster-box">
                            <img alt="Img error" src={`${host}${item.logo}`} />
                            <Row className="play-box" justify="center" align="middle">
                                <Col>
                                    <img src={play_btn} alt="Img error" />
                                </Col>
                            </Row>
                        </div>
                        <div className="content">
                            <Paragraph className="video-name" ellipsis={{ rows: 2 }}>
                                {item[`title${lang}`]}
                            </Paragraph>
                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
    }
}

export default connect(mapStateToProps, { setVideoUrl })(VideoCard);