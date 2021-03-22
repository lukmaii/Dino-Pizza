import { EventEmitter, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeHomeComponentFunction = new EventEmitter();
  subsVar!: Subscription;

  constructor() { }

  onModalButtonClick(value: string) {
    this.invokeHomeComponentFunction.emit(value);
  }
}
