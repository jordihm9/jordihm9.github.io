'use strict';

class Player {
	color;
	wins = 0;

	constructor(color) {
		this.color = color;
	}

	win() {
		this.wins++;
	}
}

class Board {
	cells;

	constructor() {
		this.clean();
	}

	play(cell, cellNum) {
		if (this.cells[cellNum] !== undefined) return;

		let p = GAME.turn();
		
		this.cells[cellNum] = p;

		if ($(cell).hasClass('cell')) {
			cell = $(cell).children('div').eq(0);
		}

		$(cell).css('background-color', p.color);

		let winner = this.check();

		if (winner !== false) {
			GAME.endRound(winner);
		}
	}

	check() {
		// check horitzonally
		for (let i = 0; i < 9; i+=3) {
			if (this.cells[i] === this.cells[i+1] && this.cells[i] === this.cells[i+2]) {
				if (this.cells[i] !== undefined) {
					return this.cells[i];
				}
			}
		}

		// check vertically
		for (let i = 0; i < 3; i++) {
			if (this.cells[i] === this.cells[i+3] && this.cells[i] === this.cells[i+6]) {
				if (this.cells[i] !== undefined) {
					return this.cells[i];
				}
			}
		}

		// check both diagonals
		// top left to bottom right
		if (this.cells[0] === this.cells[4] && this.cells[0] === this.cells[8]) {
			if (this.cells[0] !== undefined) {
				return this.cells[0];
			}
		}

		// top right to bottom left
		if (this.cells[2] === this.cells[4] && this.cells[2] === this.cells[6]) {
			if (this.cells[2] !== undefined) {
				return this.cells[2];
			}
		}

		// check if board is full
		return this.cells.every(cell => {
			return cell !== undefined;
		});
	}

	clean() {
		this.cells = [];
		$('#board').html('');

		for (let i = 0; i < 9; i++) {
			this.cells.push(undefined);

			$('#board').append(
				$('<div>')
					.addClass('cell')
					.on('click', (e)=> {
						this.play(e.target, i)
					})
					.append($('<div>'))
			);
		}
	}

	show() {
		// $('#board').css('visibility', 'visible');
		$('#board').css({
			'pointer-events': 'all',
			'opacity': '1'
		});
	}
	
	hide() {
		// $('#board').css('visibility', 'hidden');
		$('#board').css({
			'pointer-events': 'none',
			'opacity': '0.2'
		});
	}
}

class Game {
	rounds = 0;
	turns = 0;
	P01;
	P02;
	BOARD;

	constructor() {
		// create players
		this.P01 = new Player('#395CD4');
		this.P02 = new Player('#FFC300');
		
		// create the board
		this.BOARD = new Board();
	}
	
	turn() {
		this.turns++;
		return this.turns % 2 === 0 ? this.P01 : this.P02;
	}

	nextRound() {
		this.rounds++;

		this.BOARD.show();
		this.BOARD.clean();

		$('.popup').removeClass('show');
	}

	endRound(winner) {
		let text = 'Winner';
		let color;

		if (winner === this.P01) {
			this.P01.win();
			color = this.P01.color;
		} else if (winner === this.P02) {
			this.P02.win();
			color = this.P02.color;
		} else {
			text = 'Draw';
			color = 'inherit';
		}

		this.BOARD.hide();
		
		$('.popup').addClass('show');

		$('.popup > .text').text(text).css('color', color);

	}
	
	reset() {
		rounds = 0;
		turns = 0;
		this.BOARD.clean();
	}
}

const GAME = new Game();

$('#play-again').on('click', ()=> {
	GAME.nextRound();
});