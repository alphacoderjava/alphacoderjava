import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import { connect } from 'react-redux';

import { host } from "../../../server/host";

const { Paragraph } = Typography;

const AudioCard = (props) => {
    const { lang } = props;
    const list = props.list;

    return (
        <Row gutter={[24, 24]}>
            {
                list.map((item, index) => (
                    <Col span={24} key={item.id} className="audio-card-item">
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
            }
        </Row>
    )
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
    }
}

export default connect(mapStateToProps)(AudioCard);