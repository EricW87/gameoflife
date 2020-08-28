import React, {useState, useEffect} from 'react';
import {BoardPreset} from './Board';
import Preset from './Preset';

//Name; Width; Height; (start x, start y); (stop width; stop height); [board] => a=alive d=dead
const board_codes = [
    "Glider;25;25;(11,10);(14,13);dadddaaaa",
    "Spaceship;25;25;(11,10);(16,14);daaaaadddaddddaaddad",
    "Pulsar;25;25;(6,6);(19,19);ddaaadddaaadd ddddddddddddd addddadadddda addddadadddda addddadadddda ddaaadddaaadd ddddddddddddd ddaaadddaaadd addddadadddda addddadadddda addddadadddda ddddddddddddd ddaaadddaaadd"
];

export const presets = setPresets();
const miniPresets = setMiniPresets(presets);

function setPresets() {
    // console.log("readPresets");
    let presets = [];

    presets.push(randomBoard(25));
    
    for(let index = 0; index < board_codes.length; index++)
    {
        //console.log("readPresets.forEach");
        const itr = {i: 0};
        const name = getName(board_codes[index], itr);
        const width = getWidth(board_codes[index], itr);
        const height = getHeight(board_codes[index], itr);
        let {x_start, y_start, x_end, y_end} = getEnds(board_codes[index], itr);
        const cur = new BoardPreset(width, height, undefined, name, x_start, y_start, x_end, y_end);
        //console.log(cur);

        itr.i++;

        for(let y = y_start; y < y_end; y++)
        {
            for(let x = x_start; x < x_end; x++)
            {
                if(!board_codes[index][itr.i])
                    break;

                while(!(board_codes[index][itr.i] === 'a' || board_codes[index][itr.i] === 'd'))
                {
                    console.log(board_codes[index][itr.i])
                    itr.i++; //skip non-valid characters
                }
                
                if(board_codes[index][itr.i] === 'a')
                    cur.board[y][x].status = "alive"

                itr.i++;
            }
        }

        presets.push(cur);
    };

    return presets;
} // readPresets

function setMiniPresets(presets) {
    const miniPresets = presets.map((preset) => {
        const small_width = (preset.x_end - preset.x_start) + 2;
        const small_height = (preset.y_end - preset.y_start) + 2;
        const small_board = new BoardPreset(small_height, small_width, undefined, preset.name, 0, 0, 0, 0);
        let i = 1;
        let j = 1;
        //console.log(small_board, small_width, small_height);
        //console.log(small_board.board[i][j]);
        for(let y = preset.y_start; y < preset.y_end; y++)
        {
            for(let x = preset.x_start; x < preset.x_end; x++)
            {
                //console.log(small_board, j);
                small_board.board[i][j++].status = preset.board[y][x].status;
            }

            i++;
            j = 1;
        }

        //console.log(small_board);
        return small_board;
    });

    return miniPresets;
}

function getName(code, itr) {
    let name = "";

    while(code[itr.i] !== ';')
        name  = name + code[itr.i++];

    itr.i++;

    return name;
};

function getWidth(code, itr) {
    let numStr = "";
    //console.log("getWidth");

    while(code[itr.i] !== ';')
        numStr = numStr + code[itr.i++];

    itr.i++;

    return parseInt(numStr);
} // getWidth

function getHeight(code, itr) {
    return getWidth(code, itr);
} // getHeight

function getEnds(code, itr) {
    let x_start, y_start, x_end, y_end;
    let numStr = "";

    itr.i++;

    while(code[itr.i] !== ',')
        numStr = numStr + code[itr.i++];

    x_start = parseInt(numStr);
    numStr = "";
    itr.i++;

    while(code[itr.i] !== ')')
        numStr = numStr + code[itr.i++];

    y_start = parseInt(numStr);
    numStr = "";
    itr.i++;

    while(code[itr.i] !== '(')
        itr.i++;

    itr.i++;

    while(code[itr.i] !== ',')
        numStr = numStr + code[itr.i++];

    x_end = parseInt(numStr);
    numStr = "";
    itr.i++;

    while(code[itr.i] !== ')')
        numStr = numStr + code[itr.i++];

    y_end = parseInt(numStr);
    numStr = "";
    itr.i++;
    //console.log(x_start, y_start, x_end, y_end);
    return {x_start, y_start, x_end, y_end};
}

export function randomBoard(size) {
    const cur = new BoardPreset(size, size, undefined, "Random", 11, 11, 14, 14);

    for(let i = 0; i < size; i++)
        for(let j = 0; j < size; j++)
        {
            let rand = Math.random();
            if(rand >= .80)
                cur.board[i][j].status = "alive"
        } 

    return cur;
}

const Presets = ({setBoard, size}) => {
    if(presets.length === 0)
        return <div>Loading...</div>

    function selectPreset(index) {
        setBoard(presets[index]);
        console.log(presets[index]);

        if(index === 0)
            presets[0] = randomBoard(size);
    }

    //useEffect(() => {
    //    presets[0] = randomBoard(size);
    //}, [size]);

    return (
        <section className="presets-section">
            <h2>Choose a Preset layout!</h2>
            <div className="presets-container">
                {miniPresets.map((p, index) => <Preset key={Math.random()} preset={p} index={index} selectPreset={selectPreset}/>)}
            </div>
        </section>
    )
}



export default Presets;