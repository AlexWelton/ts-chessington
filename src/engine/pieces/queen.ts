import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);
        let directions = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];

        for (let dir of directions) {
            let pos = Square.at(location.row+dir[0], location.col+dir[1]);
            let clear = board.squareValid(pos);

            while (clear) {
                if (!board.squareValid(pos)) break;
                let piece = board.getPiece(pos);
                if (board.isClearMove(pos,this.player)) moves.push(pos);
                clear = piece == undefined;
                pos = Square.at(pos.row+dir[0], pos.col+dir[1]);
            }
        }

        return moves;
    }
}
