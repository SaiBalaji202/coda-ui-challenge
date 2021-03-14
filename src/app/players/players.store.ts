import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './players.model';
import { environment } from './../../environments/environment';
import {
  catchError,
  map,
  shareReplay,
  tap,
  filter,
  finalize,
} from 'rxjs/operators';
import { SpinnerService } from '../shared/UIElements/spinner/spinner.service';
import { ErrorService } from './../shared/services/error.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersStore {
  private allPlayersSubject = new BehaviorSubject<Player[]>([]);
  private filteredPlayersSubject = new BehaviorSubject<Player[]>([]);

  players$: Observable<Player[]> = this.filteredPlayersSubject.asObservable();

  selectedPlayers$ = this.allPlayersSubject.asObservable().pipe(
    filter(() => !this.load),
    map((players) => players.filter((player) => !!player.selected))
  );

  filterText: string;
  load = false;

  PRICE_AMT = 100;

  constructor(
    private http: HttpClient,
    private loading: SpinnerService,
    private errService: ErrorService
  ) {
    this.fetchAllUsers().subscribe();
  }

  public get SelectedUsers(): Player[] {
    const players = this.allPlayersSubject.getValue();
    return players.filter((player) => !!player.selected);
  }

  public set FilterUser(v: string) {
    this.filterText = v;
    this.filterPlayers(this.filterText);
  }

  private fetchAllUsers(): Observable<Player[]> {
    this.load = true;
    const players$ = this.http.get<Player[]>(environment.playersUrl).pipe(
      catchError((err) => {
        this.load = false;
        return this.errService.handleError(
          err,
          'Unable to load Players',
          'Try Refreshing the Page'
        );
      }),
      map((players) => {
        const selectedPlayers = JSON.parse(
          localStorage.getItem('selectedPlayers')
        );
        if (selectedPlayers?.length) {
          // Update Players
          this.updatePlayers(players, selectedPlayers);
        }
        return players;
      }),
      tap((players) => {
        this.load = false;
        this.allPlayersSubject.next(players);
        this.filteredPlayersSubject.next(players);
      }),
      shareReplay()
    );

    return this.loading.spinUntilComplete(players$);
  }

  updatePlayerState(playerToUpdate: Player): void {
    const players = this.allPlayersSubject.getValue();

    // Update Players
    const idx = players.findIndex(
      (player) => player.Name === playerToUpdate.Name
    );
    if (idx !== -1) {
      players[idx] = { ...playerToUpdate };
      this.allPlayersSubject.next(players);
      this.updateLocalStorage();
    }
  }

  updateWinner(winnerIdx: number): void {
    if (winnerIdx < 0 || winnerIdx > 8) {
      return;
    }

    let players = this.allPlayersSubject.getValue();

    const selectedPlayers = this.SelectedUsers;
    const winnerName = selectedPlayers[winnerIdx].Name;

    players = players.map((player) => {
      if (!player.selected) {
        return { ...player };
      } else if (player.selected && player.Name !== winnerName) {
        return {
          ...player,
          Bet: +player.Bet + 1,
          losses: player.losses ? +player.losses + 1 : 1,
        };
      } else {
        return {
          ...player,
          Bet: +player.Bet + 1,
          wins: player.wins ? +player.wins + 1 : 1,
          Price: +player.Price + this.PRICE_AMT,
        };
      }
    });

    this.allPlayersSubject.next(players);
    this.updateLocalStorage();
  }

  private filterPlayers(filterText: string = null): void {
    filterText = filterText?.trim().toLowerCase();

    let players = this.allPlayersSubject.getValue();

    if (filterText) {
      players = players?.filter((player) =>
        player?.Name.trim().toLowerCase().startsWith(filterText)
      );
    }
    this.filteredPlayersSubject.next(players);
  }

  private updateLocalStorage(): void {
    const players = this.allPlayersSubject.getValue();
    const selectedPlayers = players.filter((player) => !!player.selected);
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
  }

  private updatePlayers(players: Player[], selectedPlayers: Player[]): void {
    selectedPlayers.forEach((selectedPlayer) => {
      const idx = players.findIndex(
        (player) => player.Name === selectedPlayer.Name
      );

      if (idx !== -1) {
        players[idx] = { ...selectedPlayer, selected: true };
      }
    });
  }
}
