import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import SubjectSlider from "./components/SubjectSlider";
import VideoSlider from "./components/VideoSlider";

const ForPupils = (props) => {
    const content = props.langs[props.lang];

    return (
        <div id="pupils" className="section education-subject-section">
            <Row justify="center" className="section-heading-box">
                <Col>
                    <h3 className="section-header">
                        {content.menu_for_pupils}
                    </h3>
                    <h5 className="section-subheader">
                        {content.subheader_for_pupils}
                    </h5>
                </Col>
            </Row>
            <SubjectSlider />
            <VideoSlider />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(ForPupils);