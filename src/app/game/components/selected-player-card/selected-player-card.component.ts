import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Player } from '@game/model/players.model';

@Component({
  selector: 'coda-selected-player-card',
  templateUrl: './selected-player-card.component.html',
  styleUrls: ['./selected-player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedPlayerCardComponent implements OnInit {
  @Input() player: Player;
  @Input() winner = false;

  constructor() {}

  ngOnInit(): void {}
}
