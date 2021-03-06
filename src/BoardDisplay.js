import React from 'react';
import Board from './Board';
import sleep from './sleep.js';


const BoardDisplay = ({board, setBoard, started, turn}) => {

    async function setCell(i, j) {
        if(turn > 0 || started === true)
            return;

        const new_board = new Board(board.width, board.height, board.board);

        while(!new_board.ready)
            await sleep(100)

        if(board.board[i][j].status === "alive")
            new_board.board[i][j].status = "dead"
        else
            new_board.board[i][j].status ="alive"

        setBoard(new_board);
    }



    if(board === undefined || !board.ready)
        return <div>Loading...</div>

    return (
        <section className="board-container">
            {  
                board.board.map((row, rindex) =>
                    <div key={Math.random()} className="board-column">
                        {row.map((cell, cindex) => 
                            <div key={Math.random()} className="cell" onClick={() => setCell(rindex, cindex)} style={cell.status === "alive" ? {backgroundColor: "black"} : {backgroundColor: "white"} } >
                            </div>
                        )}
                    </div>
                )
            }
        </section>
    );
}

export default BoardDisplay;