import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { ContentComponent } from './content/content.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule  } from "@angular/material/sort";

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
