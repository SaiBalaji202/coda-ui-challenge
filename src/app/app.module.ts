import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { SharedModule } from './shared/shared.module';
import { GameDashboardComponent } from './game-dashboard/game-dashboard.component';
import { GameResultComponent } from './game-result/game-result.component';
import { PlayersComponent } from './players/players.component';
import { GameInputFormComponent } from './game-input-form/game-input-form.component';
import { PlayerCardComponent } from './player-card/player-card.component';

@NgModule({
  declarations: [AppComponent, GameDashboardComponent, GameResultComponent, PlayersComponent, GameInputFormComponent, PlayerCardComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FontAwesomeModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(faLibrary: FaIconLibrary) {
    faLibrary.addIconPacks(fas);
  }
}
