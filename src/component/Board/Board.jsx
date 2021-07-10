import React , {Component} from "react"
import randomNumber from "random-number"
import Square  from "../Square/Square"
import Player from "../Player/player"
import "./Board.css"

export default class Board extends  Component {
    

    constructor(props){
        super(props)
        this.handleSquareClick = this.handleSquareClick.bind(this)
      
    };


    componentDidMount(){
        window.setTimeout(()=>{
            // this.computerPlay()
        }, 3000)
        
        console.log("yyoo")
    }

    computerPlay(){

         if(!this.props.nextPlayer){
            const index = randomNumber({
                min : 0,
                max : 8,
                integer : true
            })
            this.props.onBoardChange(index)

     }

       
            
       
       
    }

    // VerifyPlayer(){
       
        
    // }

    // render(){

    //     this.computerPlay()
    //     console.log(this.rows)

    //     return <div className="board"> 
            
    //         {this.renderCase(0)}
    //         {this.renderCase(1)}
    //         {this.renderCase(2)}
    //         {this.renderCase(3)}
    //         {this.renderCase(4)}
    //         {this.renderCase(5)}
    //         {this.renderCase(6)}
    //         {this.renderCase(7)}
    //         {this.renderCase(8)}

    //     </div>
    // }
        
 


    handleSquareClick(index) {
        
        this.props.onBoardChange(index)

    }

    renderSquare(i, border , classLateSquare) {
    return (
        <Square
            value={this.props.squares[i]}
            border={border}
            classLateSquare = {classLateSquare}
            onSquareClick={this.handleSquareClick}
            computerPlayer={this.props.computerPlayer}
            index={i}
        />
    );
    }



        render() {

            const classLateSquare = "late"
            
        return (
            <div className="board">
           
            <div className="board-row">
                {this.renderSquare(0, "square border-left", classLateSquare)}
                {this.renderSquare(1,"square border-center", classLateSquare)}
                {this.renderSquare(2, "square border-right", classLateSquare)}
            </div>
            <div className="board-row">
                {this.renderSquare(3, "square border-left", classLateSquare)}
                {this.renderSquare(4, "square border-center", classLateSquare)}
                {this.renderSquare(5,"square border-right", classLateSquare)}
            </div>
            <div className="board-row">
                {this.renderSquare(6, "square border-end-left", classLateSquare)}
                {this.renderSquare(7, "square")}
                {this.renderSquare(8, "square border-end-right", classLateSquare)}
            </div>

            </div>
        );
        }

            


}