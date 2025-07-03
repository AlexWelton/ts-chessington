import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);

        for (let direction of [-1,1]) {
            for (let orientation of [-1,1]) {
                let posL = Square.at(location.row + direction*2, location.col + orientation);
                let posR = Square.at(location.col + orientation, location.col + direction*2)

                if (board.isClearMove(posL,this.player)) moves.push(posL);
                if (board.isClearMove(posR,this.player)) moves.push(posR);
            }
        }

        return moves;
    }
}
