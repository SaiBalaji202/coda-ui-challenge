import { Injectable } from '@angular/core';
import { MessagesService } from '../UIElements/messages/messages.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private messgesService: MessagesService) {}

  handleError(err, ...errs: string[]): Observable<never> {
    console.error(errs);
    this.messgesService.showMessages(...errs);
    return throwError(err);
  }
}
