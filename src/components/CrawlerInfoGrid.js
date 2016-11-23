import React, { Component } from "react";

import CrawlerInfo  from "./CrawlerInfo";
import { Row, Col } from "react-bootstrap";

class CrawlerInfoGrid extends Component{
    constructor(props){
        super(props)
    }
    
    renderCrawlerInfo(){
        let crawlersInfo = this.props.crawlers.map((object, index)=>{
            return (
                <Col key={index} sm={6} md={3} lg={2} style={{marginBottom:10}}>
                    <CrawlerInfo crawler={object}/>
                </Col>
            );
        })
        return crawlersInfo
    }
    
    render(){
        return(
            <Row>
                {this.renderCrawlerInfo()}
            </Row>
        );
    }
}

export default CrawlerInfoGrid;