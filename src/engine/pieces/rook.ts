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

        for (let square of Piece.getColSquares(location)) if (!location.equals(square)) moves.push(square);
        for (let square of Piece.getRowSquares(location)) if (!location.equals(square)) moves.push(square);

        return moves;
    }
}
