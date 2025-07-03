import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let location = board.findPiece(this);
        let moves = new Array(0);

        let direction = this.player == Player.WHITE ? 1 : -1;
        let homerow = this.player == Player.WHITE ? 1 : 6;

        //Single move
        let singleMoveLocation = Square.at(location.row+direction,location.col);

        if (typeof board.getPiece(singleMoveLocation) == 'undefined') moves.push(singleMoveLocation);

        //Double move
        if (location.row == homerow) {
            let doubleMoveLocation = Square.at(location.row+(direction*2),location.col);
            if (typeof board.getPiece(singleMoveLocation) == 'undefined' && typeof board.getPiece(doubleMoveLocation) == 'undefined') moves.push(doubleMoveLocation);
        }

        return moves;
    }
}
