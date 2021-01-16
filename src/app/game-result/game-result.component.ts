import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PlayersStore } from '../players/players.store';

@Component({
  selector: 'coda-game-result',
  templateUrl: './game-result.component.html',
  styleUrls: ['./game-result.component.scss'],
})
export class GameResultComponent implements OnInit {
  winnerId = -1;

  constructor(private router: Router, public playersStore: PlayersStore) {}

  ngOnInit(): void {
    this.playersStore.selectedPlayers$
      .pipe(take(1))
      .subscribe((selectedPlayers) => {
        console.log(selectedPlayers.length);

        if (!selectedPlayers || selectedPlayers.length !== 9) {
          this.router.navigate(['']);
        } else {
          const idx = Math.floor(Math.random() * 9) + 1;
          this.winnerId = selectedPlayers[idx].Bet;
        }
      });
  }
}
