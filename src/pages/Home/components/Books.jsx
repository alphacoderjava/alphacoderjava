import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import AdditionalBooksSlider from "./components/AdditionalBooksSlider";
import AudioPlaylist from './components/AudioPlaylist';

const ForPupils = (props) => {
    const content = props.langs[props.lang];

    return (
        <div className="container section education-subject-section" id="books">
            <Row justify="center" className="section-heading-box">
                <Col>
                    <h3 className="section-header">
                        {content.menu_books}
                    </h3>
                    <h5 className="section-subheader">
                        {content.subheader_for_books}
                    </h5>
                </Col>
            </Row>
            <AdditionalBooksSlider />
            <AudioPlaylist />
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