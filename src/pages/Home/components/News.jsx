import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import moment from "moment";

import { getNews } from "../../../server/config";
import SkeletonCard from "../../../globalComponents/SkeletonCard";
import { host } from '../../../server/host';

const { Paragraph } = Typography;

const dummyList = [1, 2, 3, 4];

class News extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: true,
            list: [],
        }
    }

    getData = () => {
        getNews().then((res) => {
            
            if (res && res.data && res.data) {
                // const list = res.data.content.map((obj) => {
                //     // obj.createAt = moment(obj.createAt).format("YYYY-MM-DD");
                //     return obj
                // })
                const list = res.data.data;
                this.setState({
                    list,
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

        const hasData = list && list.length ? true : false;
        return (
            <div className="news">
                <Row>
                    {
                        isFetching && (
                            dummyList.map((i) => (
                                <Col xs={24} md={12} lg={6} key={i}>
                                    <SkeletonCard />
                                </Col>
                            ))
                        )
                    }
                    {
                        hasData && (
                            list.map((item, index) => (
                                <Col xs={24} md={12} lg={6} key={item.id}>
                                    <Link to={`/article/${item.link}`}>
                                        <Card className="news-card">
                                            <div className="bg-number">
                                                {index < 10 ? `0${index}` : index}
                                            </div>
                                            <Row align="middle">
                                                <Col span={10} style={{ textAlign: "center" }}>
                                                    <img src={item.avatar} alt="Img error" />
                                                </Col>
                                                <Col span={14}>
                                                    <Paragraph className="date">
                                                        {item.createAt}
                                                    </Paragraph>
                                                    <Paragraph className="heading">
                                                        {item[`title${lang}`]}
                                                    </Paragraph>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Link>
                                </Col>
                            ))
                        )
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

export default connect(mapStateToProps)(News);