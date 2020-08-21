import React, { useState, useEffect } from 'react';
import Board from './Board';
import BoardDisplay from './BoardDisplay';
import Controls from './Controls';
import iterate from './Iterate';

import './App.css';

function App() {
  const [game, setGame] = useState([new Board(25, 25)]);
  const [turn, setTurn] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if(started === false || game.length <= 1 || turn < game.length - 3)
      return;
    
    const boards = [game[game.length - 1]];

    for(let i = 0; i < 10; i++)
      boards.push(iterate(boards[i]));

    boards.shift();
    setGame([...game, ...boards]);
  }, [turn, game, started]);

  function setBoard(b) {
    if(turn > 0)
    {
      console.warn("setBoard should not be called when turn > 0!!!!")
      return;
    }
    setGame([b])
  };

  function resetBoard() {
      setStarted(false);
      setTurn(0);
      setGame([new Board(25, 25)]);
  };

  function startGame() {
    const boards = [game[0]];

    for(let i = 0; i < 10; i++)
      boards.push(iterate(boards[i]));

    setGame([...boards]);
    setStarted(true);
  };

  return (
    <div className="App">
      <BoardDisplay board={game[turn]} setBoard={setBoard} started={started} turn={turn}/>
      <Controls turn={turn} setTurn={setTurn} started={started} startGame={startGame} resetBoard={resetBoard}/>
    </div>
  );
}

export default App;
