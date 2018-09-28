import React, { Component } from 'react';
import _ from 'lodash';
import Answer from './components/Answer';
import Numbers from './Numbers';
import  Button from './components/Button';
import DoneFrame from './components/DoneFrame';
import Stars from './components/Stars';
import Instructions from './components/Instructions';

var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };

export default class Game extends Component {
    static randomNumber = () => 1 + Math.floor(Math.random() * 9);
    static initialState = () => ({
      selectedNumbers: [],
      randomNumberOfStars: Game.randomNumber(),
      correctAnswer: null,
      usedNumbers: [],
      redraws: 5,
      gameStatus: null
    });
    state = Game.initialState();

      selectNumber = (clickedNumber) => {
        if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
          this.setState(prevState => ({
            correctAnswer: null,
              selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
          }));
      };

      deselectNumber = (clickedNumber) => {
          this.setState(prevState => ({
            correctAnswer: null,
            selectedNumbers: prevState.selectedNumbers.filter(number => number !== clickedNumber)
        }));
      }

      checkAnswer = () => {
          this.setState(prevState => ({
            correctAnswer: prevState.randomNumberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
        }))
      };

      acceptAnswer = () => {
          this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
          selectedNumbers: [],
          correctAnswer: null,
          randomNumberOfStars: Game.randomNumber()
        }), this.updateGameStatus);
      };

      redraw = () => {
          if (this.state.redraws === 0) { return; }
          this.setState(prevState => ({
            randomNumberOfStars: Game.randomNumber(),
          correctAnswer: null,
          selectedNumbers: [],
          redraws: prevState.redraws - 1
        }), this.updateGameStatus);
      };


      possibleSolutions = ({ randomNumberOfStars, usedNumbers }) => {
          const possibleNumbers = _.range(1, 10).filter(number => usedNumbers.indexOf(number) === -1);
        return possibleCombinationSum(possibleNumbers, randomNumberOfStars);
      };

      updateGameStatus = () => {
          this.setState(prevState => {
            if(prevState.usedNumbers.length === 9) {
              return { gameStatus: 'Done. Nice' };
          }
          if(prevState.redraws === 0 && !this.possibleSolutions(prevState)) {
              return { gameStatus: 'Game Over!' };
          }
        });
      };

      resetGame = () => {
          this.setState(Game.initialState())
      };

      render() {
      const { selectedNumbers, randomNumberOfStars, correctAnswer, usedNumbers, redraws, gameStatus } = this.state;
        return (
          <div className="container">
            <h3>Play Nine</h3>
            <hr />
            <div className="row">
              <Stars numberOfStars={randomNumberOfStars}/>
              <Button selectedNumbers={selectedNumbers}
              checkAnswer={this.checkAnswer}
              correctAnswer={correctAnswer}
              acceptAnswer={this.acceptAnswer}
              redraw={this.redraw}
              redraws={redraws}
              />
              <Answer selectedNumbers={selectedNumbers} deselectNumber={this.deselectNumber}/>
            </div>
            <br />
            {gameStatus ?
                <DoneFrame resetGame={this.resetGame} gameStatus={gameStatus}/> :
                <Numbers selectedNumbers={selectedNumbers} selectNumber={this.selectNumber} usedNumbers={usedNumbers}/>
            }
            <br/>
            <Instructions/>
          </div>
        );
      }
    }