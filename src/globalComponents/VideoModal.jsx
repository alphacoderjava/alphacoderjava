import React from 'react';
import { Modal } from 'antd';
import { connect } from "react-redux";

import { setVideoUrl } from "../redux/action";
import { host } from "../server/host";

import "./component.less";

const VideoModal = (props) => {
    const video = props.video;

    return (
        <Modal
            visible={video}
            onCancel={() => props.setVideoUrl(null)}
            centered
            closable={false}
            footer={false}
            className="video-modal"
            width={1000}
        >
            <video autoPlay width="100%" controls>
                <source src={`${host}${video}`}></source>
            </video>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        video: state.video,
    }
}

export default connect(mapStateToProps, { setVideoUrl })(VideoModal);