import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { PlayersStore } from '@app/game/store/players.store';

@Injectable({
  providedIn: 'root',
})
export class OnlyNinePlayersGuard implements CanActivate {
  constructor(private router: Router, public playersStore: PlayersStore) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.playersStore.selectedPlayers$.pipe(
      take(1),
      map((selectedPlayers) => {
        const hasNinePlayers = selectedPlayers?.length === 9;
        return hasNinePlayers ? true : this.router.createUrlTree(['']);
      })
    );
  }
}
