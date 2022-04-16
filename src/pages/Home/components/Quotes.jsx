import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

import quote_1 from "../../../assets/img/quote_1.png";
import {getQuotes} from "../../../server/config/home";
import {host} from "../../../server/host";
class Quotes extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    getData=(page,size)=>{
        getQuotes(page,size).then(res=>{
            if (res && res.data) {
                this.setState({
                    list: res.data.data,
                })
            } else {
                this.setState({
                    isFetching: false,
                })
            }
        })
    }
    componentDidMount() {
        this.getData(0,12);
    }

    render() {
        const { langs, lang } = this.props;

        const content = langs[lang];
        const  {list}=this.state;

        return (
            <div className="container section quote-section">
                <Row justify="center" className="section-heading-box">
                    <Col>
                        <h3 className="section-header">
                            {content.menu_quotes}
                        </h3>
                        <h5 className="section-subheader">
                            {content.subheader_for_quotes}
                        </h5>
                    </Col>
                </Row>
                <Row gutter={[32]} justify="center">
                    {
                        Array.isArray(list) ?
                            list.map(item=>(
                                <Col xs={24} md={12} lg={8}>
                                    <div className="quote-card">
                                        <div className="quote-box">
                                            <p>
                                                {item.last_name}
                                            </p>
                                            <img src={item.avatar} alt="Img error" />
                                        </div>
                                        <p className="user-name">{item.first_name} </p>
                                    </div>
                                </Col>
                            )):''
                    }


                </Row>
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

export default connect(mapStateToProps)(Quotes);