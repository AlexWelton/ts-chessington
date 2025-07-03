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
        moves.push(Square.at(location.row+direction,location.col));

        //Double move
        if (location.row == homerow) moves.push(Square.at(location.row+(direction*2),location.col));

        return moves;
    }
}
