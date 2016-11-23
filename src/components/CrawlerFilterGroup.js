import React, { Component } from "react";

import RaisedButton from "material-ui/RaisedButton";

class CrawlerFilterGroup extends Component{
    constructor(props){
        super(props);
        this.state = {
            filter: "Forums"
        }
    }
    
    onButtonClick(filter){
        let oldFilter = this.state.filter
        this.setState({filter: filter})
        this.props.onFilterChange(oldFilter, filter)
    }
    
    render(){
        return(
            <div>
                <RaisedButton label="Forums" primary={(this.state.filter==="Forums")?true:false} style={{marginRight:12}} onClick={this.onButtonClick.bind(this, "Forums")} />
                <RaisedButton label="Blogs" primary={(this.state.filter==="Blogs")?true:false}  style={{marginRight:12}} onClick={this.onButtonClick.bind(this, "Blogs")} />
                <RaisedButton label="News" primary={(this.state.filter==="News")?true:false}  style={{marginRight:12}} onClick={this.onButtonClick.bind(this, "News")} />
            </div>
        )
    }
}
export default CrawlerFilterGroup