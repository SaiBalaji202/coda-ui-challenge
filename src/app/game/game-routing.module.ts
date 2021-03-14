import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlyNinePlayersGuard } from './guards/only-nine-players.guard';
import { GameDashboardComponent } from './pages/game-dashboard/game-dashboard.component';
import { GameResultComponent } from './pages/game-result/game-result.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule],
})
export class GameRoutingModule {}
