import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  squares = Array(9).fill(null);
  player = 'X';
  winner: any = null;

  get status(): string {
    return this.winner ? `Winner: ${this.winner}` : `Player: ${this.player}`;
  }

  newGame(): void {
    this.squares = Array(9).fill(null);
    this.player = 'X';
    this.winner = null;
  }

  makeMove(index: number): void {
    if (!this.winner && !this.squares[index]) {
      this.squares[index] = this.player;

      if (this.winingMove()) {
        this.winner = this.player;
      }

      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  winingMove(): boolean {
    const lines = [
      [0, 1, 2], // rows
      [3, 4, 5], // rows
      [6, 7, 8], // rows
      [0, 3, 6], // cols
      [1, 4, 7], // cols
      [2, 5, 8], // cols
      [0, 4, 8], // diagonals
      [2, 4, 6], // diagonals
    ];

    for (const line of lines) {
      if (
        this.squares[line[0]] &&
        this.squares[line[0]] === this.squares[line[1]] &&
        this.squares[line[1]] === this.squares[line[2]]
      ) {
        return true;
      }
    }

    return false;
  }
}
