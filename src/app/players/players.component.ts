import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player } from './players.model';
import { PlayersStore } from './players.store';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'coda-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayersComponent implements OnInit {
  faSearch = faSearch;
  constructor(public playersStore: PlayersStore) {}

  ngOnInit(): void {}

  onUserToggle(player: Player, select: boolean): void {
    player.selected = select;
    this.playersStore.updatePlayerState(player);
  }
}
