import "./Loader.css"

import React, { Component } from "react";

class Loader extends Component{
    
    render(){
        let style={display:"none"}
        if(this.props.show)
            style={}
            
        return(
            <div className="loading" style={style}></div>
        )
    }
}
Loader.defaultProps = {
    show: false
}
export default Loader