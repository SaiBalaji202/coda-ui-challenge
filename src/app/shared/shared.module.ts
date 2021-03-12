import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SpinnerComponent } from './UIElements/spinner/spinner.component';
import { MessagesComponent } from './UIElements/messages/messages.component';
import { CheckBoxComponent } from './UIElements/check-box/check-box.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { InputComponent } from './UIElements/input/input.component';
import { PaginatorComponent } from './UIElements/paginator/paginator.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [
    SpinnerComponent,
    MessagesComponent,
    CheckBoxComponent,
    SafeUrlPipe,
    InputComponent,
    PaginatorComponent,
  ],
  exports: [
    SpinnerComponent,
    MessagesComponent,
    CheckBoxComponent,
    InputComponent,
    SafeUrlPipe,
    PaginatorComponent,
  ],
})
export class SharedModule {}
