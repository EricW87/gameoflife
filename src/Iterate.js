import Board from './Board';

function iterate(cur_board)
{
    const alive = "alive";
    const dead = "dead";
    const width = cur_board.width;
    const height = cur_board.height;
    const new_board = new Board(width, height);

    for(let w = 0; w < width; w++)
    {
        for(let h = 0; h < height; h++)
        {
            let state = dead;

            if(cur_board.board[w][h].status === alive)
                state = alive;

            let n = getNeighbors(w, h, cur_board);
            if(state === alive)
                console.log(n)
            if(state === alive && (n === 2 || n === 3)) //rule #1
            {
                console.log(n)
                new_board.board[w][h].status = alive;
            }
            else if(state === dead && n === 3) //rule #2
            {
                new_board.board[w][h].status = alive;
            }
            else //rule #3
            {
                new_board.board[w][h].status = dead;
            }
        }
    }

    return new_board;
} // iterate

function getNeighbors(width, height, cur_board)
{
    let n = 0;
    const alive = "alive";

    if(width > 0) //there are tiles to the "west"
    {
        if(height > 0) //there are tiles to the "north"
            if(cur_board.board[width - 1][height - 1].status === alive) //get Nidth neighbor
                n++;

        if(height < cur_board.height - 1) //there are tiles to the "south"
            if(cur_board.board[width - 1][height + 1].status === alive) //get SW neighbor
                    n++;
        
        if(cur_board.board[width - 1][height].status === alive) //get W neighbor
            n++;
    }

    if(width < cur_board.width - 1) // there are tiles to the "east"
    {
        if(height > 0) //there are tiles to the "north"
            if(cur_board.board[width + 1][height - 1].status === alive) //get NE neighbor
                n++;
        //console.log(n, width, height, cur_board.width, cur_board.height)
        if(height < cur_board.height - 1) //there are tiles to the "south"
            if(cur_board.board[width + 1][height + 1].status === alive) //get SE neighbor
                    n++;
        
        if(cur_board.board[width + 1][height].status === alive) //get E neighbor
            n++;
    }

    if(height > 0 && cur_board.board[width][height - 1].status === alive) //get N neighbor
        n++;
    
    if(height < cur_board.height - 1 && cur_board.board[width][height + 1].status === alive) //get S neighbor
        n++;

    return n;
} // getNeighbors

export default iterate;