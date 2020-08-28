import React from 'react';

const Rules = () => {
    return (
        <section className="rules-container">
            <h2>Rules of the Game</h2>
            <ul>
                <li>The game consists of a grid made up of cells.</li>
                <li>Each cell is either alive(black) or dead(white)</li>
                <li>At each new turn(or step) in the game, cells can transition from alive to dead or from dead to alive based on four rules.</li>
                <li>Rule 1: Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                <li>Rule 2: Any live cell with two or three live neighbours lives on to the next generation</li>
                <li>Rule 3: Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
                <li>Rule 4: Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
            </ul>
        </section>
    )
}

export default Rules;