import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
        board.lastDoubleMove = false;
    }

    public isValidCapture(piece:Piece) {
        return piece.player != this.player && !(this instanceof King);
    }

    public checkDirections(moves:Square[], directions:number[][], board:Board, location:Square) {
        for (let dir of directions) {
            let pos = Square.at(location.row+dir[0], location.col+dir[1]);
            let clear = board.squareValid(pos);

            while (clear) {
                if (!board.squareValid(pos)) break;
                let piece = board.getPiece(pos);
                if (board.isClearMove(pos,this.player)) moves.push(pos);
                clear = piece == undefined;
                pos = Square.at(pos.row+dir[0], pos.col+dir[1]);
            }
        }
    }
}
