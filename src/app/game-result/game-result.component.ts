import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { PlayersStore } from '../players/players.store';
import { Player } from '@app/players/players.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'coda-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  winnerIdx: number;
  winnerId: number;

  faSyncAlt = faSyncAlt;
  players: number[];

  constructor(public playersStore: PlayersStore) {}

  ngOnInit(): void {
    this.replay();
  }

  replay(): void {
    this.winnerIdx = Math.floor(Math.random() * 8) + 1;
    this.playersStore.updateWinner(this.winnerIdx);
  }
}
