import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SandboxPageComponent } from './sandbox-page/sandbox-page.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditReadingEntryComponent } from './edit-reading-entry/edit-reading-entry.component';
import { EventCardComponent } from './event-card.component';
import { BooksPageComponent } from './books-page/books-page.component'
import { CalendarViewComponent } from './calendar-view/calendar-view.component';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SandboxPageComponent,
    EditBookComponent,
    EditReadingEntryComponent,
    EventCardComponent,
    BooksPageComponent,
    CalendarViewComponent,
    TopNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
