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

        for (let xOffset of [-1,0,1]) {
            for (let yOffset of [-1,0,1]) {
                if(! (xOffset == 0 && yOffset == 0)) moves.push(Square.at(location.row+xOffset, location.col+yOffset));
            }
        }

        return moves;
    }
}
