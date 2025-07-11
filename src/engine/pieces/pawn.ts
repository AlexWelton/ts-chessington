import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Queen from "./queen";
import Knight from "./knight";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Pawn extends Piece {

    public constructor(player: Player) {
        super(player);
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);

        if (Math.abs(newSquare.col - currentSquare.col) == 1 && this.isValidEnPassant(board,newSquare)) {
            board.setPiece(Square.at(currentSquare.row, newSquare.col), undefined);
        }
        board.lastDoubleMove = (Math.abs(currentSquare.row - newSquare.row) == 2);
        board.movePiece(currentSquare, newSquare);

        let endrow = this.player == Player.WHITE ? 7 : 0;
        if (newSquare.row == endrow) {
            //Promoting

            let pieceType = null;
            let promoteString = (board.defaultPromote == undefined) ? prompt("Select piece to promote into >> ") : board.defaultPromote;

            while (pieceType == null) {
                switch (promoteString) {
                    case "Q":
                        pieceType = Queen;
                        break;
                    case "N":
                        pieceType = Knight;
                        break;
                    case "B":
                        pieceType = Bishop;
                        break;
                    case "R":
                        pieceType = Rook;
                        break;
                    default:
                        promoteString = prompt("Invalid promotion\nSelect piece to promote into >> ");
                        break;
                }
            }


            board.setPiece(newSquare, new pieceType (this.player));
        }

    }

    public isValidEnPassant (board: Board, newSquare: Square): boolean{
        const currentSquare = board.findPiece(this);

        let otherPiece = board.getPiece(Square.at(currentSquare.row, newSquare.col));


        return (otherPiece instanceof Pawn && board.lastDoubleMove && otherPiece.player != this.player);
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
