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
    if(turn < game.length - 3 || started === false)
      return;
    
    const boards = [game[game.length - 1]];

    for(let i = 0; i < 10; i++)
      boards.push(iterate(boards[i]));

    boards.shift();
    setGame([...game, ...boards]);
  }, [turn]);

  function setBoard(b) {
    if(turn > 0)
    {
      console.warn("setBoard should not be called when turn > 0!!!!")
      return;
    }
    setGame([b])
  };

  useEffect(() => {
    if(started === false)
    {
      setTurn(0);
      setGame([new Board(25, 25)]);
    }
    else if(turn === 0)
    {
      const boards = [game[0]];
      for(let i = 0; i < 10; i++)
      {         
          boards.push(iterate(boards[i]))
      }
      setGame(boards);
    }
  }, [started]);

  return (
    <div className="App">
      <BoardDisplay board={game[turn]} setBoard={setBoard} started={started} turn={turn}/>
      <Controls turn={turn} setTurn={setTurn} started={started} setStarted={setStarted}/>
    </div>
  );
}

export default App;