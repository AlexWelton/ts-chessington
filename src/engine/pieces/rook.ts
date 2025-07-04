import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);

        let directions = [[0,1],[1,0],[0,-1],[-1,0]];

        this.checkDirections(moves,directions,board,location);

        return moves;
    }
}
