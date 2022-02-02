import React, { Component } from "react";
import KO from "../../assets/images/KO.png";
import "./errorBoundary.css"

export default class ErrorBoundary extends Component{
    constructor(props){
        super(props)
        this.state = {
            hasError: false,
            errorMessage: ""
        }
    }
    static getDerivedStateFromError(error){
        return {
            hasError: true,
            errorMessage: error ? error.message : "" 
        }
    }
    componentDidCatch(error, errorInfo){
        console.log("error", error, errorInfo)
    }
    
    render(){
        if(this.state.hasError){
            return( 
                <div className="error--boundary">
                    <div className="error--boundary--title">Opss, Something went wrong</div>
                    <img className="error--boundary--images" src={KO} alt="something went wrong"/>
                    <div className="error--boundary--description">{this.state.errorMessage}</div>
                </div>
            )
        }
        return this.props.children;
    }
}