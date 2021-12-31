import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class KeyboardNavigationService {

  private keyEventSubject = new Subject<KeyboardEvent>();
  public keyEventObs: Observable<KeyboardEvent> = this.keyEventSubject.asObservable();

  public distributeKeyPress(keyValue: KeyboardEvent): void {
    this.keyEventSubject.next(keyValue);
  }
}
