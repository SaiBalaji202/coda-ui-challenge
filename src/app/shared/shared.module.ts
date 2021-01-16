import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpinnerComponent } from './UIElements/spinner/spinner.component';
import { MessagesComponent } from './UIElements/messages/messages.component';
import { CheckBoxComponent } from './UIElements/check-box/check-box.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    SpinnerComponent,
    MessagesComponent,
    CheckBoxComponent,
    SafeUrlPipe,
  ],
  exports: [
    SpinnerComponent,
    MessagesComponent,
    CheckBoxComponent,
    SafeUrlPipe,
  ],
})
export class SharedModule {}
