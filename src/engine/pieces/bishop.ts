import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);
        let directions = [[1,1],[1,-1],[-1,-1],[-1,1]];

        this.checkDirections(moves,directions,board,location);

        return moves;
    }
}
