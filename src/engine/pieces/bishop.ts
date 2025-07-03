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

        let diff = Math.abs(location.col-location.row);
        for (let row = 0, col = row + diff; row < 8 && col < 8; row++, col = row + diff) {
            if (!location.equals(Square.at(row,col))) moves.push(Square.at(row, col));
        }

        let sum = location.col+location.row;
        for (let row = 0, col = sum - row; row < 8 && col >= 0 && col < 8; row++, col = sum - row) {

            if (!location.equals(Square.at(row,col))) moves.push(Square.at(row, col));
        }

        return moves;
    }
}
