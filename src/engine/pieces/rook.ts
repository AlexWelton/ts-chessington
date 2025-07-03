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

        for (let i = 0; i < 8; i++) {
            if (i != location.row) moves.push(Square.at(i,location.col));
            if (i != location.col) moves.push(Square.at(location.row,i));
        }

        return moves;
    }
}
