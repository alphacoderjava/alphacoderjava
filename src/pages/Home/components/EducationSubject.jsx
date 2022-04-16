import React from 'react';
import { Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSubject } from "../../../server/config";
import { host } from '../../../server/host';
import SkeletonCard from "../../../globalComponents/SkeletonCard";

import third_section_cropped from "../../../assets/img/third_section_cropped.png";

const dummyList = [1, 2, 3, 4, 5];

class EducationSubject extends React.Component {
    constructor() {
        super();
        this.state = {
            isFetching: true,
            list: [],
        }
    }

    getData = () => {
        getSubject().then((res) => {
            if (res && res.data && res.data) {
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
        this.getData();
    }

    render() {
        const { list, isFetching } = this.state;
        const { lang } = this.props;
        const content = this.props.langs[this.props.lang];

        const hasData = list && list.length ? true : false;

        return (
            <div className="site-border-bottom">

                <div className="container section education-subject-section" id="about-education">
                    <Row justify="center" className="section-heading-box">
                        <Col>
                            <h3 className="section-header">
                                {content.heading_subject}
                            </h3>
                        </Col>
                    </Row>
                    <Row className="visible-lg " justify="center" style={{ textAlign: "center" }}>
                        <Col span={24}>
                            <img src={third_section_cropped} alt="Img error" width="95%" className="noselect" />
                        </Col>
                    </Row>
                    <Row justify="center">
                        {
                            isFetching && (
                                dummyList.map((i) => (
                                    <Col flex="20%" key={i}>
                                        <SkeletonCard />
                                    </Col>
                                ))
                            )
                        }
                        {
                            hasData && (
                                list.map((item) => (
                                    <Col flex="20%" key={item.id}>
                                        <Card className="edu-card">
                                            <img className="visible-xs visible-sm visible-md" src={`${host}${item.logo}`} alt="Img error" />
                                            <p className="heading">
                                                {item[`title${lang}`]}
                                            </p>
                                            <Link className="link" to={`/article/${item.link}`}>{content.more}</Link>
                                        </Card>
                                    </Col>
                                ))
                            )
                        }
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        lang: state.lang,
        langs: state.langs,
    }
}

export default connect(mapStateToProps)(EducationSubject);