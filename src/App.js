import React, { Component } from "react";
import async                from "async";

import AppBar             from "material-ui/AppBar";
import { Grid, Row, Col } from "react-bootstrap";

import CrawlerInfoGrid    from "./components/CrawlerInfoGrid";
import CrawlerFilterGroup from "./components/CrawlerFilterGroup";
import Loader             from "./components/Loader";
import ExtractorFactory   from "./lib/factory/extractor";

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            crawlers: [],
            loading: true
        }
        this.onFilterChange = this.onFilterChange.bind(this)
    }
    
    componentDidMount(){
        this.onFilterChange(null,"Forums")
    }
    
    onFilterChange(oldFilter, newFilter){
        this.setState({loading:true})
        
        async.waterfall([
            (callback)=>{
                let factory = new ExtractorFactory();
                let extractor = factory.getExtractor(factory.CRAWLERS_META);
                extractor.extract((crawlersMeta)=>{
                    callback(null, crawlersMeta);
                })
            }
        ], (err, result)=>{
            this.setState({
                crawlers: result.getCrawlers(newFilter),
                loading: false
            })
        })
    }
    
    render(){
        return(
            <Grid fluid={true} style={{paddingLeft:30, paddingRight:30}}>
                <Loader show={this.state.loading} />
                <Row style={{marginBottom:20, marginLeft:-30, marginRight:-30}}>
                    <Col>
                        <AppBar title="Crawler Monitoring Platform"/>
                    </Col>
                </Row>
                <Row style={{marginBottom:20}}>
                    <CrawlerFilterGroup onFilterChange={this.onFilterChange}/>
                </Row>
                <Row>
                    <CrawlerInfoGrid crawlers={this.state.crawlers}/>
                </Row>
            </Grid>
        )
    }
}

export default App