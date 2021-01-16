import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayersStore } from '../players/players.store';

@Component({
  selector: 'coda-game-input-form',
  templateUrl: './game-input-form.component.html',
  styleUrls: ['./game-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInputFormComponent implements OnInit {
  constructor(private router: Router, public playersStore: PlayersStore) {}

  ngOnInit(): void {}

  showResult(): void {
    this.router.navigate(['result']);
  }
}
