import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);

        let rowSquares = Piece.getRowSquares(location);
        let colSquares = Piece.getColSquares(location);

        let rowRange = [-1,-1];
        let colRange = [-1,-1];

        for (let square of colSquares) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined) {
                    if (square.row < location.row && (colRange[0] == -1 || square.row > colRange[0])) colRange[0] = square.row;
                    if (square.row > location.row && (colRange[1] == -1 || square.row < colRange[1])) colRange[1] = square.row;
                }
            }
        }

        for (let square of rowSquares) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined) {
                    if (square.col < location.col &&  (rowRange[0] == -1 || square.col > rowRange[0])) rowRange[0] = square.col;
                    if (square.col > location.col &&  (rowRange[1] == -1 || square.col < rowRange[1])) rowRange[1] = square.col;
                }

            }
        }

        if (rowRange[1] == -1) rowRange[1] = 8;
        if (colRange[1] == -1) colRange[1] = 8;

        for (let square of rowSquares) {
            if ((!location.equals(square)) && square.col > rowRange[0] && square.col < rowRange[1])  moves.push(square);
        }

        for (let square of colSquares) {
            if ((!location.equals(square)) && square.row > colRange[0] && square.row < colRange[1])  moves.push(square);
        }
        console.log(moves);
        return moves;
    }
}
