import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Player } from './players.model';
import { PlayersStore } from './players.store';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { paginate } from '@app/shared/utils/paginate';

@Component({
  selector: 'coda-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss'],
})
export class PlayersComponent implements OnInit {
  players$: Observable<Player[]>;

  faSearch = faSearch;
  totalPlayers = 0;
  currentPage = 1;
  PAGE_SIZE = 10;

  paginate = paginate;

  constructor(public playersStore: PlayersStore) {}

  ngOnInit(): void {
    this.paginateUsers();
  }

  onUserToggle(player: Player, select: boolean): void {
    player.selected = select;
    this.playersStore.updatePlayerState(player);
  }

  onPageChange(selectedPage: number): void {
    this.currentPage = selectedPage;
    this.paginateUsers();
  }

  private paginateUsers(): void {
    this.players$ = this.playersStore.players$.pipe(
      tap((players) => {
        this.totalPlayers = players?.length;
      }),
      map((players) =>
        paginate<Player>(players, this.currentPage, this.PAGE_SIZE)
      )
      // tap((players) => console.log(players?.length))
    );
  }
}
