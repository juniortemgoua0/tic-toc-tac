import React , {Component} from "react"
import "./Player.css"

export default class Player extends  Component {
    

    constructor(props){
        super(props)

       
        
    };

    componentDidMount(){
        this.props.nextPlayer ? this.ComputerPlayerDesign() : this.gamePlayerDesign()
        console.log("monter")
    }

    ComputerPlayerDesign(){
        
       const btnComputerPlayer = document.getElementById("btnComputerPlayer")
       const btnGamePlayer = document.getElementById("btnGamePlayer")
       if(btnComputerPlayer && btnGamePlayer){
        btnGamePlayer.classList.remove("btn-player-design")
            btnComputerPlayer.classList.add("btn-player-design")
            window.setTimeout(() => {
                btnComputerPlayer.classList.remove("btn-player-design")
                btnGamePlayer.classList.add("btn-player-design")

            },1100)
    }

    }

    gamePlayerDesign(){
       const btnComputerPlayer = document.getElementById("btnComputerPlayer")
       const btnGamePlayer = document.getElementById("btnGamePlayer")
       if(btnComputerPlayer && btnGamePlayer){
        btnComputerPlayer.classList.remove("btn-player-design")
          btnGamePlayer.classList.add("btn-player-design")
       }
    }



    wait(t){
        const start = Date.now()
        while (Date.now()-start < t){}
        return new Promise.resolve()
    }


    render(){
        
        this.ComputerPlayerDesign()
    

        return <button id={this.props.btnPlayerId} className="btn-player">
            <span>{this.props.value}</span>
            <span>{this.props.score === 0 ? "-" : this.props.score }</span>
        </button>
    }


}