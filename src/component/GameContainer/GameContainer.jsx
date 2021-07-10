import React from "react"
import randomBool from "random-bool"
import randomNumber from "random-number"
import "./GameContainer.css"
import Player from "../Player/player"
import Board from "../Board/Board"


export default class GameContainer extends React.PureComponent {
    
  
    constructor(props){
        super(props)

        this.state = {
            squares: Array(9).fill(null),
            history: [{
                squares: Array(9).fill(null),
            }],
            lastMove:{
              char: "",
              position: null
            },
            player: {
                startPlayer:randomBool(),
                gamePlayer:null,
                computerPlayer:null,
                 nextPlayer: null,
            },
            stepNumber:0,
            gamePlayerScore : 0,
            computerPlayerScore : 0
          
        };
        // fixe les differents evenements sur le composant 
        this.handleBoardChange = this.handleBoardChange.bind(this);
        this.handleReplayClick = this.handleReplayClick.bind(this);
        
    };

    
    // MONTRAGE DU COMPOSANT PRINCIPAL , S'EXECUTE UNE SEULE FOIS
    componentDidMount(){
      /* verifie si c'est l'ordinateur ou le joueur qui commence a partir du state initial
    *si le state.player.start player est vrai , alors le joueur commence
    *sinon l'ordinatuer commence 
    *Modifie ensuite les symboles du joueur et de l'ordinateur de facon aleatoire
   */

      if (!this.state.player.startPlayer){
        this.setState((state, props) => ({
          player: {
            startPlayer : state.player.startPlayer,
            computerPlayer : randomBool() ? "X" : "O"
          }
        }))
  
        this.setState((state, props) => ({
          player : {
            startPlayer : state.player.startPlayer,
            computerPlayer : state.player.computerPlayer,
            gamePlayer : state.player.computerPlayer === "X" ? "O" : "X",
            nextPlayer: state.player.computerPlayer
          }
        }))
      this.makeComputerMove(randomNumber({
        min : 0,
        max : 8,
        integer : true
    }))

  
      }else {
        this.setState((state, props) => ({
          player: {
            startPlayer : state.player.startPlayer,
            gamePlayer : randomBool() ? "X" : "O"
          }
        }))
  
        this.setState((state, props) => ({
          player : {
            startPlayer : state.player.startPlayer,
            gamePlayer : state.player.gamePlayer,
            computerPlayer : state.player.gamePlayer === "X" ? "O" : "X",
            nextPlayer: state.player.gamePlayer
          }
        }))
      }
    }

  /************** FONCTIONS DE GESTION DES EVENEMENTS **************/
  

    /** GESTION DE CLICK SUR LE TABLEAU **/
    async handleBoardChange(index){
                
      // le joueur joue       
      await this.makeMove(index);
      console.log("premier rendu")

      
      // l'ordinateur joue
      const squares = this.state.history[this.state.stepNumber].squares.slice();
      const bestSquare = this.findBestSquare(squares, this.state.player.nextPlayer);
      if (bestSquare !== -1) {
       
        await this.makeMove(bestSquare); 
        console.log("Deuxieme rendu")
      }
     
  }

  
  /** GESTION DE CLICK SUR LE BOUTTON REJOUER **/
  handleReplayClick(e){
   
    if (!this.state.player.startPlayer){
      this.setState((state, props) => ({
        player: {
          startPlayer : state.player.startPlayer,
          computerPlayer : randomBool() ? "X" : "O"
        },
        
      }))

      this.setState((state, props) => ({
        player : {
          startPlayer : state.player.startPlayer,
          computerPlayer : state.player.computerPlayer,
          gamePlayer : state.player.computerPlayer === "X" ? "O" : "X",
          nextPlayer: state.player.computerPlayer
        },
        squares: Array(9).fill(null),
            history: [{
                squares: Array(9).fill(null),
            }],
            lastMove:{
              char: "",
              position: null
            },
      }))
    this.makeComputerMove(randomNumber({
      min : 0,
      max : 8,
      integer : true
  }))


    }else {
      this.setState((state, props) => ({
        player: {
          startPlayer : state.player.startPlayer,
          gamePlayer : randomBool() ? "X" : "O"
        }
      }))

      this.setState((state, props) => ({
        player : {
          startPlayer : state.player.startPlayer,
          gamePlayer : state.player.gamePlayer,
          computerPlayer : state.player.gamePlayer === "X" ? "O" : "X",
          nextPlayer: state.player.gamePlayer
        },
        squares: Array(9).fill(null),
            history: [{
                squares: Array(9).fill(null),
            }],
            lastMove:{
              char: "",
              position: null
            },
      }))
    }
  }


  /*********************** FIN  *********************/

    


  /************** FONCTIONS DE GESTION DES JEUX **************/

    /*PERMET D'EFFECTUER UN TOUR DE JOUR 
         {index} represente l'index de la case jouer
    */
    makeMove(index){

      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if ( squares[index] || this.calculateWinner(squares) ) {
       
        return Promise.resolve();
      }
      squares[index] = this.state.player.nextPlayer 
      const nextState = {
        squares :squares,
        history: history.concat([
          {
            squares: squares
          }
        ]),
        player : {
          startPlayer : this.state.player.startPlayer,
          gamePlayer : this.state.player.gamePlayer,
          computerPlayer : this.state.player.computerPlayer,
          nextPlayer: this.state.player.nextPlayer === "X" ?  "O" : "X"
        },
        stepNumber: history.length,
        };
    
        return new Promise((resolve, reject) => {
          this.setState(nextState, resolve);
        });

    }
    
    // simule le jeux de l'ordinateur lorsqu'il commence la partie
    makeComputerMove(index){
        const history = this.state.history.slice();
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (this.calculateWinner(squares) || squares[index]) {
          return ;
        }
        squares[index] = this.state.player.nextPlayer === "O" ? "O" : "X"
        this.setState((state, props) => ({
          squares :squares,
          history: history.concat([
            {
              squares: squares
            }
          ]),
          player : {
            startPlayer : state.player.startPlayer,
            gamePlayer : state.player.gamePlayer,
            computerPlayer : state.player.computerPlayer,
            nextPlayer: state.player.computerPlayer === "O" ? "X" : "O"
          },
          stepNumber: history.length,
        }));
        
    }


     /************** FIN **************/

  
     // Determine si il y'a un jeux gagnant
    calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }


      // verifie si le tableau est plein
       isBoardFilled(squares) {
        for (let i = 0; i < squares.length; i++) {
          if (squares[i] === null) {
            return false;
          }
        }
        return true;
      }


      
      /*********** GESTION DES REPONSE DE L'ORDINATEUR **************/
      findBestSquare(squares, player) {
        // player est le symbole du joueur en cours 
        // opponent est le symbole de l'ordinateur
        const opponent = player === 'X' ? 'O' : 'X';
        
        const minimax = (squares, isMax) => {
          const winner = this.calculateWinner(squares);
          
          // si le joueur gagne , le score est 1
          if (winner === player) return { square: -1, score: 1 };
          
          // si l'ordinateur gagne , le score est -1
          if (winner === opponent) return { square: -1, score: -1 };
          
          // Si le partie est acheve, le score est 0
          if (this.isBoardFilled(squares)) return { square: -1, score: 0 };
          
          // Initialisez 'best'. Si isMax est vrai, nous voulons maximiser le score, et le minimiser sinon.
          const best = { square: -1, score: isMax ? -1000 : 1000 };
          
          // Parcourez chaque case du tableau
          for (let i = 0; i < squares.length; i++) {
            // Si la case est déjà rempli, ce n'est pas un coup valide alors sautez-le
            if (squares[i]) {
              continue;
            }
            
            // Si la case n'est pas rempli, alors c'est un coup valide. Jouez dans la case.
            squares[i] = isMax ? player : opponent;
            /* Simulez le jeu jusqu'à la fin du jeu et obtenez le score,
            en appelant récursivement minimax.*/ 
            const score = minimax(squares, !isMax).score;
            // Annule le mouvement
            squares[i] = null;
      
            if (isMax) {
              // Maximiser le joueur ; suivre le plus grand score et se déplacer.
              if (score > best.score) {
                best.score = score;
                best.square = i;
              }
            } else {
              // Minimiser l'ordinateur ; suivre le plus petit score et se déplacer.
              if (score < best.score) {
                best.score = score;
                best.square = i;
              }
            }
          }
          
          // Le coup qui mène au meilleur score en fin de partie.
          return best;
        };
        
        // Le meilleur coup pour le « joueur » donné sur le plateau actuel
        return minimax(squares, true).square;
      }
     

    render(){

        const history = this.state.history;
        let current = history[history.length - 1];
        
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status =  winner + ' a gagné';
        } else {
            status = 'C\'est a  ' + (this.state.player.nextPlayer === "X" ? "O" : "X") + " de jouer";
        }

       
        return <div className="game-container">
              <div className="container-player-btn">

                      <Player 
                      value={this.state.player.gamePlayer} 
                      startPlayer={this.state.player.startPlayer} 
                      onDesignBtnPlayer= {this.state.player.startPlayer === true ? this.gamePlayerDesign : this.ComputerPlayerDesign}
                      btnPlayerId = "btnGamePlayer"
                      nextPlayer={this.state.player.startPlayer}
                      score={this.state.gamePlayerScore}
                      />
                      <Player
                       value={this.state.player.computerPlayer} 
                       startPlayer={this.state.player.startPlayer} 
                       nextPlayer={this.state.player.startPlayer}
                      onDesignBtnPlayer= {this.state.player.startPlayer === true ? this.gamePlayerDesign : this.ComputerPlayerDesign}
                       btnPlayerId = "btnComputerPlayer"
                       score={this.state.computerPlayerScore}
                        />
                    
              </div>

              <div className="status">
                <p>{status}</p>
                {/* <p>{JSON.stringify(this.state)}</p> */}
              </div>

              <div className="container-board">
                
                    <Board 
                    squares={current.squares} 
                    computerPlayer={this.state.player.computerPlayer} 
                    onBoardChange={this.handleBoardChange}
                    />
              </div>    
             

              <div className="replay-btn">
                    <span onClick={this.handleReplayClick}>REJOUER</span>
              </div>
         
           
        </div>

    }


}