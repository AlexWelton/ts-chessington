import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import King from "./king";

export default class Pawn extends Piece {

    public lastDoubleMove: boolean;

    public constructor(player: Player) {
        super(player);
        this.lastDoubleMove = false;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);

        this.lastDoubleMove = (Math.abs(currentSquare.row - newSquare.row) == 2);
        console.log('pawn is moving', currentSquare, newSquare, this.lastDoubleMove);
        board.movePiece(currentSquare, newSquare);

    }

    public isValidEnPassant (board: Board, newSquare: Square): boolean{
        const currentSquare = board.findPiece(this);
        console.log(currentSquare.row, newSquare.col);
        let otherPiece = board.getPiece(Square.at(currentSquare.row, newSquare.col));

        console.log(otherPiece);
        console.log(otherPiece instanceof Pawn && otherPiece.lastDoubleMove && otherPiece.player != this.player);
        return (otherPiece instanceof Pawn && otherPiece.lastDoubleMove && otherPiece.player != this.player);
    }

    public getAvailableMoves(board: Board) {
        let location = board.findPiece(this);
        let moves = new Array(0);

        let direction = this.player == Player.WHITE ? 1 : -1;
        let homerow = this.player == Player.WHITE ? 1 : 6;

        //Single move
        let singleMoveLocation = Square.at(location.row+direction,location.col);
        let singleMoveLocationValid = singleMoveLocation?.validOn(board) && (typeof board.getPiece(singleMoveLocation) == 'undefined');

        if (singleMoveLocationValid) {
            moves.push(singleMoveLocation);
            //Double move
            if (location.row == homerow) {
                let doubleMoveLocation = Square.at(location.row+(direction*2),location.col);
                if (doubleMoveLocation?.validOn(board) && typeof board.getPiece(doubleMoveLocation) == 'undefined') moves.push(doubleMoveLocation);
            }
        }


        //Capturing move
        let leftCaptureLocation = Square.at(location.row+direction,location.col-1);
        let rightCaptureLocation = Square.at(location.row+direction,location.col+1);

        if (board.squareValid(leftCaptureLocation)) {
            let leftPiece = board.getPiece(leftCaptureLocation);
            if (leftPiece?.isValidCapture(this) || this.isValidEnPassant(board, leftCaptureLocation)) moves.push(leftCaptureLocation);
        }

        if (board.squareValid(rightCaptureLocation)) {
            let rightPiece  = board.getPiece(rightCaptureLocation);
            if (rightPiece?.isValidCapture(this) || this.isValidEnPassant(board, rightCaptureLocation)) moves.push(rightCaptureLocation);
        }

        return moves;
    }
}
