class Cell { 
    constructor(status = 'dead') {
        this.status = status;
    };
};

class Board
{
    constructor(width, height, old_board=null)
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
                if(old_board === null)
                    this.board[w][h] = new Cell();
                else
                    this.board[w][h] = new Cell(old_board[w][h].status)
        }

        this.ready = true;
    };
    
};

export class BoardPreset extends Board {
    constructor(width, height, old_board, name, x_start, y_start, x_end, y_end) {
        super(width, height, old_board);

        this.name = name;
        this.x_start = x_start;
        this.y_start = y_start;
        this.x_end = x_end;
        this.y_end = y_end;
    }

};

export default Board;