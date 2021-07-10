import React , {Component} from "react"
import "./Square.css"


export default class Square extends  Component {

    constructor(props){
        super(props);
        this.state = {
            caseValue: ""
        }
        this.handleClick = this.handleClick.bind(this);
        
    }
    

    handleClick(e){
        this.props.onSquareClick(parseInt(e.target.id))
    }


    render(){

        const square = document.getElementById(this.props.index)

        if ( this.props.value === "X"){
            square.style.color = "rgb(92, 90, 86)"
        }
        
        let  classLateSquare  = this.props.value && this.props.value === this.props.computerPlayer ? this.props.classLateSquare : ""
        let className =   this.props.border ===null ? "square" : this.props.border
        return <div className={className} id={this.props.index} onClick={this.handleClick}>
            <span  className={classLateSquare} >
                {this.props.value }
                </span>
        </div>
    }


}