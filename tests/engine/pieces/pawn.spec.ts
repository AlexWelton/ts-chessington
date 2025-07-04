import Pawn from '../../../src/engine/pieces/pawn';
import Board from '../../../src/engine/board';
import Player from '../../../src/engine/player';
import Square from '../../../src/engine/square';
import Rook from '../../../src/engine/pieces/rook';
import King from '../../../src/engine/pieces/king';
import * as assert from "node:assert";
import {should} from "chai";
import Queen from "../../../src/engine/pieces/queen";
import Knight from "../../../src/engine/pieces/knight";

describe('Pawn', () => {

    let board: Board;
    beforeEach(() => board = new Board());

    describe('white pawns', () => {

        it('can only move one square up if they have already moved', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 0), pawn);
            pawn.moveTo(board, Square.at(2, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(3, 0));
        });

        it('can move one or two squares up on their first move', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(1, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(2, 7), Square.at(3, 7)]);
        });

        it('cannot move at the top of the board', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(7, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.WHITE);
            const friendlyPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingKing = new King(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(5, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(5, 3));
        });

        it('can move to capture en passant', () => {
            const pawn = new Pawn(Player.WHITE);
            const opposingPiece = new Pawn(Player.BLACK);

            board.currentPlayer = Player.BLACK;

            board.setPiece(Square.at(4, 3), pawn);
            board.setPiece(Square.at(6, 4), opposingPiece);
            opposingPiece.moveTo(board, Square.at(4,4));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(5, 4));
        });
    });

    describe('black pawns', () => {

        let board: Board;
        beforeEach(() => board = new Board(Player.BLACK));

        it('can only move one square down if they have already moved', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 0), pawn);
            pawn.moveTo(board, Square.at(5, 0));

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(1);
            moves.should.deep.include(Square.at(4, 0));
        });

        it('can move one or two squares down on their first move', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(6, 7), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.have.length(2);
            moves.should.deep.include.members([Square.at(4, 7), Square.at(5, 7)]);
        });

        it('cannot move at the bottom of the board', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(0, 3), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.be.empty;
        });

        it('can move diagonally if there is a piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Rook(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(3, 3));
        });

        it('cannot move diagonally if there is no piece to take', () => {
            const pawn = new Pawn(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take a friendly piece', () => {
            const pawn = new Pawn(Player.BLACK);
            const friendlyPiece = new Rook(Player.BLACK);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), friendlyPiece);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('cannot take the opposing king', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingKing = new King(Player.WHITE);
            board.setPiece(Square.at(4, 4), pawn);
            board.setPiece(Square.at(3, 3), opposingKing);

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(3, 3));
        });

        it('can move to capture en passant', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPiece);
            opposingPiece.moveTo(board, Square.at(3,3));

            const moves = pawn.getAvailableMoves(board);

            moves.should.deep.include(Square.at(2, 3));
        });

        it('can actually capture en passant', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPiece);
            opposingPiece.moveTo(board, Square.at(3,3));
            pawn.moveTo(board, Square.at(2,3));

            var eaten = board.getPiece(Square.at(3,3));


            assert.equal(eaten, undefined, 'not undefined');

        });

        it('will not capture for non en passant moves', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPiece);
            opposingPiece.moveTo(board, Square.at(3,3));
            pawn.moveTo(board, Square.at(2,4));

            var eaten = board.getPiece(Square.at(3,3));

            assert.notEqual(eaten, undefined, 'is undefined');

        });

        it('cannot move en passant after a different piece moves', () => {
            const pawn = new Pawn(Player.BLACK);
            const opposingPiece = new Pawn(Player.WHITE);

            const otherPawn = new Pawn(Player.BLACK);
            const otherOpposingPawn = new Pawn(Player.WHITE);

            board.currentPlayer = Player.WHITE;

            board.setPiece(Square.at(3, 4), pawn);
            board.setPiece(Square.at(1, 3), opposingPiece);
            board.setPiece(Square.at(0, 0), otherPawn);
            board.setPiece(Square.at(1,1), otherOpposingPawn);

            opposingPiece.moveTo(board, Square.at(3,3));
            otherPawn.moveTo(board, Square.at(1,0));
            otherOpposingPawn.moveTo(board, Square.at(0,1));

            const moves = pawn.getAvailableMoves(board);

            moves.should.not.deep.include(Square.at(2, 3));

        });

        it('promote to queen (when queen)', () => {
            const pawn = new Pawn(Player.BLACK);
            board.defaultPromote = 'Q';

            board.setPiece(Square.at(1, 0), pawn);

            pawn.moveTo(board, Square.at(0,0));

            let piece = board.getPiece(Square.at(0,0));

            assert.equal(piece instanceof Queen, true);

        });

        it('promote to knight (when knight)', () => {
            const pawn = new Pawn(Player.BLACK);
            board.defaultPromote = 'N';

            board.setPiece(Square.at(1, 0), pawn);

            pawn.moveTo(board, Square.at(0,0));

            let piece = board.getPiece(Square.at(0,0));

            assert.equal(piece instanceof Knight, true);

        });

    });

    it('cannot move if there is a piece in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(5, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.be.empty;
    });

    it('cannot move two squares if there is a piece two sqaures in front', () => {
        const pawn = new Pawn(Player.BLACK);
        const blockingPiece = new Rook(Player.WHITE);
        board.setPiece(Square.at(6, 3), pawn);
        board.setPiece(Square.at(4, 3), blockingPiece);

        const moves = pawn.getAvailableMoves(board);

        moves.should.not.deep.include(Square.at(4, 3));
    });
});
