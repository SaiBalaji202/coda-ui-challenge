import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Player } from './players.model';
import { environment } from './../../environments/environment';
import { catchError, map, shareReplay, tap, filter } from 'rxjs/operators';
import { SpinnerService } from '../shared/UIElements/spinner/spinner.service';
import { ErrorService } from './../shared/services/error.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayersStore {
  private playersSubject = new BehaviorSubject<Player[]>([]);
  players$ = this.playersSubject.asObservable();
  selectedPlayers$ = this.players$.pipe(
    filter(() => !this.load),
    map((players) => players.filter((player) => !!player.selected))
  );
  load = false;

  constructor(
    private http: HttpClient,
    private loading: SpinnerService,
    private errService: ErrorService
  ) {
    this.fetchAllUsers().subscribe();
  }

  public get SelectedUsers(): Player[] {
    const players = this.playersSubject.getValue();
    return players.filter((player) => !!player.selected);
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
        this.playersSubject.next(players);
      }),
      shareReplay()
    );
    return this.loading.spinUntilComplete(players$);
  }

  updatePlayerState(playerToUpdate: Player): void {
    const players = this.playersSubject.getValue();

    // Update Players
    const idx = players.findIndex(
      (player) =>
        player.Name === playerToUpdate.Name && player.Bet === playerToUpdate.Bet
    );
    if (idx !== -1) {
      players[idx] = { ...playerToUpdate };
      this.playersSubject.next(players);
      this.updateLocalStorage();
    }
  }

  private updateLocalStorage(): void {
    const players = this.playersSubject.getValue();
    const selectedPlayers = players.filter((player) => !!player.selected);
    localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
  }

  private updatePlayers(players: Player[], selectedPlayers: Player[]): void {
    selectedPlayers.forEach((selectedPlayer) => {
      const idx = players.findIndex(
        (player) =>
          player.Name === selectedPlayer.Name &&
          player.Bet === selectedPlayer.Bet
      );
      if (idx !== -1) {
        players[idx] = { ...selectedPlayer, selected: true };
      }
    });
  }
}
