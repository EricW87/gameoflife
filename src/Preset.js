import React from 'react';
import Board from './Board';
import sleep from './sleep';

const Preset = ({index, preset, selectPreset}) => {
    //console.log(preset);
    if(!preset)
        return null;

    
    return (
        <div onClick={() => selectPreset(index)} className="board-container">
            {
            preset.board.map((row) =>
                <div key={Math.random()} className="board-column">
                    {row.map((cell) => 
                        <div key={Math.random()} className="cell" style={cell.status === "alive" ? {backgroundColor: "black"} : {backgroundColor: "white"} } >
                        </div>
                    )}
                </div>
            )}
            <h2>{preset.name}</h2>
        </div>
    );
};

export default Preset;