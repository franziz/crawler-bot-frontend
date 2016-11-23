import React, { Component } from "react";

import Paper                from "material-ui/Paper";
import { List, ListItem }   from "material-ui/List";
import ReportProblemIcon    from "material-ui/svg-icons/action/report-problem";
import DoneIcon             from "material-ui/svg-icons/action/done";
import { red500, green500 } from "material-ui/styles/colors";

class CrawlerInfo extends Component{
    calculateDelay(time){
        let moment = require("moment")
        let result = {
            display: "N/A",
            icon: <ReportProblemIcon color={red500}/>
        }
        if(time != null){
            let difference = moment().diff(moment(time), "days", true)
            result.display = moment(time).fromNow()
            result.icon    = (difference > 1.5)?<ReportProblemIcon color={red500}/>:<DoneIcon color={green500}/>
        }
        return result
    }
    
    render(){
        let headingStyle  = {whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}
        let insertTime    = this.props.crawler.status.insertTime
        let convertedTime = this.props.crawler.status.convertedTime
        
        insertTime    = this.calculateDelay(insertTime)
        convertedTime = this.calculateDelay(convertedTime)

        return(
            <Paper style={{padding:10}}>
                <h4 style={headingStyle}>{this.props.crawler.name}</h4>
                <List>
                    <ListItem primaryText="Insert Time" secondaryText={insertTime.display} rightIcon={insertTime.icon}/>
                    <ListItem primaryText="Converted Time" secondaryText={convertedTime.display} rightIcon={convertedTime.icon}/>
                </List>
            </Paper>
        )
    }
}
CrawlerInfo.defaultProps = {
    insertTime: -1,
    convertedTime: -1
}

export default CrawlerInfo;