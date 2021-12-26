import { NgModule } from '@angular/core';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {MatIconModule} from '@angular/material/icon';
import { ContentComponent } from './components/content/content.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      NotFoundComponent,
      ContentComponent,
    ],
    imports: [
      CommonModule,
      MatIconModule,
    ],
    exports: [
      NotFoundComponent,
      ContentComponent,
    ],
    providers: [],
    bootstrap: []
  })
  export class SharedModule { }