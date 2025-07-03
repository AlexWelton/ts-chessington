import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);

        let directions = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];

        for (let dir of directions) {
            let pos = Square.at(location.row+dir[0], location.col+dir[1]);
            let valid = board.squareValid(pos) && (board.getPiece(pos) == undefined);

            if (valid) {
                moves.push(pos);
            }
        }

        return moves;
    }
}
