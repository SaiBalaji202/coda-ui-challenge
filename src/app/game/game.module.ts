import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GameDashboardComponent } from '@app/game/pages/game-dashboard/game-dashboard.component';
import { GameInputFormComponent } from '@app/game/components/game-input-form/game-input-form.component';

import { SharedModule } from '@app/shared/shared.module';
import { PlayerCardComponent } from './components/player-card/player-card.component';
import { PlayersComponent } from './components/players/players.component';
import { SelectedPlayerCardComponent } from './components/selected-player-card/selected-player-card.component';
import { GameRoutingModule } from './game-routing.module';
import { GameResultComponent } from './pages/game-result/game-result.component';
import { GameComponent } from './game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    GameDashboardComponent,
    GameResultComponent,
    PlayersComponent,
    GameInputFormComponent,
    PlayerCardComponent,
    SelectedPlayerCardComponent,
    GameComponent,
  ],
  imports: [CommonModule, FontAwesomeModule, GameRoutingModule, SharedModule],
})
export class GameModule {}
