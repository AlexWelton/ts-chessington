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

        let blSquares = Piece.getBLDiagonalSquares(location);
        let tlSquares = Piece.getTLDiagonalSquares(location);

        let blRange = [-1,-1];
        let tlRange = [-1,-1];

        for (let square of Piece.getBLDiagonalSquares(location)) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined) {
                    if (square.row < location.row && (blRange[0] == -1 || square.row > blRange[0])) blRange[0] = square.row;
                    if (square.row > location.row && (blRange[1] == -1 || square.row < blRange[1])) blRange[1] = square.row;
                }
            }
        }

        for (let square of Piece.getTLDiagonalSquares(location)) {
            if (!location.equals(square)) {
                let piece = board.getPiece(square);

                if (piece != undefined) {
                    if (square.row < location.row && (tlRange[0] == -1 || square.row > tlRange[0])) tlRange[0] = square.row;
                    if (square.row > location.row && (tlRange[1] == -1 || square.row < tlRange[1])) tlRange[1] = square.row;
                }

            }
        }

        if (blRange[1] == -1) blRange[1] = 8;
        if (tlRange[1] == -1) tlRange[1] = 8;

        for (let square of blSquares) {
            if (!location.equals(square) && square.row > blRange[0] && square.row < blRange[1])  moves.push(square);
        }

        for (let square of tlSquares) {
            if (!location.equals(square) && square.row > tlRange[0] && square.row < tlRange[1])  moves.push(square);
        }

        return moves;
    }
}
