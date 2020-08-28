import React, { useState, useEffect } from 'react';
import Board from './Board';
import BoardDisplay from './BoardDisplay';
import Controls from './Controls';
import iterate from './Iterate';
import Presets from './Presets';
import Title from './Title';
import Rules from './Rules';
import About from './About';
import Animate from './Animate';
import Options from './Options';
import {presets, randomBoard} from './Presets';

function App() {
  const [size, setSize] = useState(25);
  const [wrap, setWrap] = useState(true);
  const [game, setGame] = useState([new Board(size, size)]);
  const [turn, setTurn] = useState(0);
  const [started, setStarted] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if(started === false || game.length <= 1 || turn < game.length - 5)
      return;
    
    const boards = [game[game.length - 1]];

    for(let i = 0; i < 20; i++)
      boards.push(iterate(boards[i]));

    boards.shift();
    setGame([...game, ...boards]);
  }, [turn, game, started]);

  useEffect(() => {
    resetBoard();
  }, [size]);

  function setBoard(b) {
    if(turn > 0 || started === true)
    {
      console.warn("setBoard should not be called when turn > 0!!!!")
      return;
    }
    setGame([b])
  };

  function resetBoard() {
    //if(started === false)
        //return;
      
    setStarted(false);
    setTurn(0);
    setGame([new Board(size, size)]);
    presets[0] = randomBoard(size);
  };

  function startGame() {
    if(started === true)
        return;

    const boards = [game[0]];

    for(let i = 0; i < 20; i++)
      boards.push(iterate(boards[i]));

    setGame([...boards]);
    setStarted(true);
  };

  return (
    <div className="App">
      <Title />
      <div className="outer-flex-container">
      <BoardDisplay board={game[turn]} setBoard={setBoard} started={started} turn={turn}/>
      <div className="inner-flex-container">
        <Controls turn={turn} setTurn={setTurn} started={started} startGame={startGame} resetBoard={resetBoard} animate={animate}/>
        <Animate turn={turn} setTurn={setTurn} started={started} animate={animate} setAnimate={setAnimate} />
        <Options size={size} setSize={setSize} wrap={wrap} setWrap={setWrap} started={started}/>
        <Presets setBoard={setBoard} size={size}/>
      </div>
      </div>
      <Rules />
      <About />
    </div>
  );
}

export default App;
