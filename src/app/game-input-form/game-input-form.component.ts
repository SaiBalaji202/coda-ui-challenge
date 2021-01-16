import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PlayersStore } from '../players/players.store';

@Component({
  selector: 'coda-game-input-form',
  templateUrl: './game-input-form.component.html',
  styleUrls: ['./game-input-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameInputFormComponent implements OnInit {
  constructor(public playersStore: PlayersStore) {}

  ngOnInit(): void {}
}
