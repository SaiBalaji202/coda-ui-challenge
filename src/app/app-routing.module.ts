import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { GameResultComponent } from './game-result/game-result.component';

import { OnlyNinePlayersGuard } from './guards/only-nine-players.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GameDashboardComponent,
  },
  {
    path: 'result',
    component: GameResultComponent,
    canActivate: [OnlyNinePlayersGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
