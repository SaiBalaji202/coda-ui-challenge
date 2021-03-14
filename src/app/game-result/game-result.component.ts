import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { PlayersStore } from '../players/players.store';

@Component({
  selector: 'coda-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  winnerIdx: number;
  faSyncAlt = faSyncAlt;

  constructor(private router: Router, public playersStore: PlayersStore) {}

  ngOnInit(): void {
    this.replay();
  }

  replay(): void {
    this.winnerIdx = Math.floor(Math.random() * 8) + 1;
  }
}
