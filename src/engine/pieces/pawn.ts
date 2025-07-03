import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

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
        let singleMoveLocation = Square.at(location.row+direction,location.col);
        if (board.squareValid(singleMoveLocation) && (typeof board.getPiece(singleMoveLocation) == 'undefined')) moves.push(singleMoveLocation);

        //Double move
        if (location.row == homerow) {
            let doubleMoveLocation = Square.at(location.row+(direction*2),location.col);
            if (board.squareValid(doubleMoveLocation) && (typeof board.getPiece(singleMoveLocation) == 'undefined') && typeof board.getPiece(doubleMoveLocation) == 'undefined' ) moves.push(doubleMoveLocation);
        }

        //Capturing move
        let leftCaptureLocation = Square.at(location.row+direction,location.col-1);
        let rightCaptureLocation = Square.at(location.row+direction,location.col+1);

        if (board.squareValid(leftCaptureLocation)) {
            let leftPiece = board.getPiece(leftCaptureLocation);
            let rightPiece  = board.getPiece(leftCaptureLocation);

            if (leftPiece != undefined && leftPiece.player != this.player && !(leftPiece instanceof King)) moves.push(leftCaptureLocation);
            if (rightPiece != undefined && rightPiece.player != this.player && !(rightPiece instanceof King)) moves.push(rightCaptureLocation);
        }


        return moves;
    }
}
