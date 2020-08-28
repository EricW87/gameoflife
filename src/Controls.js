import React from 'react';

const Controls = ({turn, setTurn, started, startGame, resetBoard, animate}) => {

    function handleTurn(amount) {
        if(started === false || (turn === 0 && amount === -1))
            return;

        setTurn(turn + amount);
    }
    
    if(!started)
        return (
            <section className="controls-container">
                <div className="start-button-container">
                    <button className="start-button" onClick={() => startGame()}>Start!</button>
                </div>
                <div className="start-instructions-container">
                    <span>Click the squares in the grid to create an initial state. Press start when ready.</span>
                </div>
            </section>
        )
    else if(!animate)
        return (
            <section className="controls-container">
                <div className="turn-counter"><span>Turn #: {turn}</span></div>
                <div className="turn-container">
                    <button onClick={() => handleTurn(1)}>Next</button>
                    <button onClick={() => handleTurn(-1)}>Previous</button>
                </div>
                <div className="clear-button">
                    <button onClick={() => resetBoard()}>Clear</button>
                </div>
            </section>
        )
    else if(animate)
        return (
            <section className="controls-container">
                <div className="turn-counter"><span>Turn #: {turn}</span></div>
                <div className="turn-container">
                    <button style={{backgroundColor: "grey", pointerEvents: "none",}}>Next</button>
                    <button style={{backgroundColor: "grey", pointerEvents: "none",}}>Previous</button>
                </div>
                <div className="clear-button">
                    <button style={{backgroundColor: "grey", pointerEvents: "none",}}>Clear</button>
                </div>
            </section>
        )
} // Controls

export default Controls;