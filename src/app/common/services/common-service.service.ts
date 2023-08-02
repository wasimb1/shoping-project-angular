import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isListOpen = new BehaviorSubject<boolean>(false);
  constructor() { }

}
