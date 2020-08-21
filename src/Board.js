class Cell { 
    constructor(status = 'dead') {
        this.status = status;
    };
};

class Board
{
    constructor(width, height, old_board)
    {
        this.board = new Array(width);
        this.width = width;
        this.height = height;
        this.ready = false;
        let w;
        let h;

        for(w = 0; w < width; w++) 
        {
            this.board[w] = new Array(height);
    
            for(h = 0; h < height; h++)
                if(old_board === undefined)
                    this.board[w][h] = new Cell();
                else
                    this.board[w][h] = new Cell(old_board[w][h].status)
        }

        this.ready = true;
    };
    
};

export default Board;