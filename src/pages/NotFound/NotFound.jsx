import React from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NotFound = (props) => {
    const content = props.content;

    return (
        <Result
            status="404"
            title="404"
            subTitle={content.not_found_subtitle}
            extra={
                <Button style={{ borderRadius: "15px" }}>
                    <Link to="/">
                        {content.not_found_btn}
                    </Link>
                </Button>}
        />
    )
}

const mapStateToProps = (state) => {
    return {
        content: state.langs[state.lang],
    }
}

export default connect(mapStateToProps)(NotFound);