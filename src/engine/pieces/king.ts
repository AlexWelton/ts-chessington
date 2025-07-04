import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import Rook from "./rook";

export default class King extends Piece {
    public hasMoved : boolean;

    public constructor(player: Player) {
        super(player);
        this.hasMoved = false;
    }

    public checkCastleAllowed(board : Board, direction:number) {
        let location = board.findPiece(this);
        let currentSquare = Square.at(location.row, location.col + direction)

        let count = direction == -1 ? 3 : 2

        for (let i = count; i > 0; i--) {
            if (!(board.getPiece(currentSquare) == undefined)) return false

            currentSquare = Square.at(currentSquare.row, currentSquare.col + direction);
        }

        //Rook check here
        let piece = board.getPiece(currentSquare);
        return (piece instanceof Rook && piece.player == this.player && !piece.hasMoved);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array(0);
        let location = board.findPiece(this);

        let directions = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]];

        //Cardinal Direction Movement
        for (let dir of directions) {
            let pos = Square.at(location.row+dir[0], location.col+dir[1]);
            let valid = board.isClearMove(pos,this.player);

            if (valid) {
                moves.push(pos);
            }
        }

        //Castling
        console.log(this.hasMoved);
        if (!this.hasMoved) {

            if (this.checkCastleAllowed(board, -1)) moves.push(Square.at(location.row,location.col-2));

            if (this.checkCastleAllowed(board, 1)) moves.push(Square.at(location.row,location.col+2));
        }

        console.log(moves);
        return moves;
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        board.lastDoubleMove = false;
        this.hasMoved = true;
        var diff = newSquare.col - currentSquare.col;
        if (Math.abs(diff) == 2) {
            let homerow = this.player == Player.WHITE ? 0 : 7;

            if (diff > 0){

                let rook = board.getPiece(Square.at(homerow, 7));
                board.setPiece(Square.at(homerow, 5), rook);
                board.setPiece(Square.at(homerow, 7), undefined);
            } else {

                let rook = board.getPiece(Square.at(homerow, 0));
                board.setPiece(Square.at(homerow, 3), rook);
                board.setPiece(Square.at(homerow, 0), undefined);

            }
        }
    }

}
