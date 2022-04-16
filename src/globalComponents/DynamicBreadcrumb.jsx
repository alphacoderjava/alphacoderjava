import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { pageTypesIds } from "../contants";

const DynamicBreadcrumb = withRouter(props => {
    const { location, content } = props;
    const breadcrumbNameMap = {
        [`${pageTypesIds.subjects}`]: content.breadcrumb_subject,
        [`${pageTypesIds.videos}`]: content.breadcrumb_video,
        [`${pageTypesIds.books}`]: content.breadcrumb_books,
        [`${pageTypesIds.audios}`]: content.breadcrumb_audio,
    }

    const pathSnippets = location.pathname.split('/').filter(i => i);
    pathSnippets.shift();

    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `${pathSnippets.slice(0, index + 1).join('/')}`;
        return (
            <Breadcrumb.Item key={url}>
                <Link to={`/all-list/${url}`}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">{content.breadcrumb_home}</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return <Breadcrumb separator="-" className="dynamic-breadcrumb">{breadcrumbItems}</Breadcrumb>;
});

const mapStateToProps = (state) => {
    return {
        content: state.langs[state.lang],
    }
}

export default connect(mapStateToProps)(DynamicBreadcrumb);