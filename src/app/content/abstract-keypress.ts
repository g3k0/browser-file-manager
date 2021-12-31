/**
 * for the keyboard navigation I followed this tutorial:
 * https://torsten-muller.dev/angular/navigation-in-an-angular-application-using-keyboard-shortcuts/
 */

import { Component, OnDestroy, OnInit } from "@angular/core";
import { filter, map, Subscription } from "rxjs";
import { KeyboardNavigationService } from "../services/keyboard-navigation.service";

@Component({
    template: ''
})
export abstract class AbstractKeypress implements OnInit, OnDestroy {

    private obsRef: Subscription = new Subscription();
  
    abstract keyActions: {[key: string]: () => void};
    abstract reactToKeyPress(key: string): void;
  
    protected constructor(private keyServiceRef: KeyboardNavigationService) { }
  
    public ngOnInit() {
      this.obsRef = this.keyServiceRef.keyEventObs
        .pipe(
          filter(this.permitKey),
          map(this.convertToString)
        )
        .subscribe(
          this.reactToKeyPress.bind(this),
        );
    }
  
  
    public ngOnDestroy() {
      this.obsRef.unsubscribe();
    }
  
    public permitKey(keyEvent: KeyboardEvent): boolean {
        const disallowedKeys = ['Meta'];
        return !disallowedKeys.includes(keyEvent.key);
      }
    
      public convertToString(keyEvent: any): string {
        const modifierKeys = ['altKey', 'ctrlKey', 'shiftKey'];
        let keyCode = 'k-';
        for (const code of modifierKeys) {
          if (keyEvent[code]) keyCode += code.substr(0, 1);
        }
        return `${keyCode}-${keyEvent.code}`;
    }
  
}