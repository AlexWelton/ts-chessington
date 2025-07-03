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
        let rowRange = [-1,8];
        let colRange = [-1,8];

        for (let square of Piece.getColSquares(location)) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined)
                    if (square.row < location.row && square.row > rowRange[0]) rowRange[0] = square.row;
                    if (square.row > location.row && square.row < rowRange[1]) rowRange[1] = square.row;
                }
        }

        for (let square of Piece.getColSquares(location)) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined) {
                    if (square.col < location.col && square.col > colRange[0]) colRange[0] = square.col;
                    if (square.col > location.col && square.col < colRange[1]) colRange[1] = square.col;
                }

            }
        }

        for (let i = rowRange[0]+1; i < rowRange[1]; i++) {
            if (!(location.row == i))  moves.push(Square.at(i,location.col));
        }

        for (let i = colRange[0]+1; i < colRange[1]; i++) {
            if (!(location.col == i))  moves.push(Square.at(location.row,i));
        }

        return moves;
    }
}
