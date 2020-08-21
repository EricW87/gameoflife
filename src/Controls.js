import React from 'react';

const Controls = ({turn, setTurn, started, startGame, resetBoard}) => {

    function handleTurn(amount) {
        if(started === false || (turn === 0 && amount === -1))
            return;

        setTurn(turn + amount);
    }
    
    if(!started)
        return (
            <section className="controls-container">
                <button onClick={() => startGame()}>Start!</button>
            </section>
        )
    else    
        return (
            <section className="controls-container">
                <div>{turn}</div>
                <button onClick={() => handleTurn(1)}>+</button>
                <button onClick={() => handleTurn(-1)}>-</button>
                <button onClick={() => resetBoard}>Clear</button>
            </section>
        )
} // Controls

export default Controls;