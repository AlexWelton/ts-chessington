import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }

    protected static getBLDiagonalSquares(location : Square) : Square[]   {
        let squares = new Array(0);
        let diff = Math.abs(location.col-location.row);

        for (let row = 0, col = row + diff; row < 8 && col < 8; row++, col = row + diff) {
            squares.push(Square.at(row,col));
        }
        return squares
    }

    protected static getTLDiagonalSquares(location : Square) : Square[]  {
        let squares = new Array(0);
        let sum = location.col+location.row;

        for (let row = 0, col = sum - row; row < 8 && col >= 0 && col < 8; row++, col = sum - row) {
            squares.push(Square.at(row,col));
        }
        return squares
    }

    protected static getRowSquares(location : Square) : Square[] {
        let squares = new Array(0);

        for (let i = 0; i < 8; i++) {
            squares.push(Square.at(i,location.col));
        }

        return squares;
    }

    protected static getColSquares(location: Square) : Square[] {
        let squares = new Array(0);

        for (let i = 0; i < 8; i++) {
            squares.push(Square.at(location.row,i));
        }

        return squares;
    }

}
