import { Component } from '@angular/core';
import { ApiService } from "../api.service"
import { Book, ReadingEntry } from '../api-types';
import { EditMode } from '../types';
import { wait } from '../misc';
import { ReadingEntryService } from '../reading-entry.service'
import { BookService } from '../book.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  books$ = this.bookService.items$;
  readingEntries$ = this.readingEntryService.items$;

  // Undefined if not editing
  editingReadingEntry?: {
    editMode: EditMode,
    book: Book;
    readingEntry?: ReadingEntry // Undefined if creating a new entry
  };

  constructor(
    private apiService: ApiService,
    private readingEntryService: ReadingEntryService,
    private bookService: BookService
  ) {}

  async addReadingEntry(book: Book) {
    await this.stopEditingReadingEntryAndTick();
    this.editingReadingEntry = {
      editMode: EditMode.NEW,
      book
    };
  }

  async deleteReadingEntry(entry: ReadingEntry) {
    this.stopEditingReadingEntry();
    await wait(0) // So that confirm() doesn't block updating ui for stopEditingBook()

    const yes = confirm("Delete reading entry? " + entry.id);
    if (yes) {
      this.apiService.deleteReadingEntry(entry.id).then(
        () => {
          console.info(`Deleted reading entry ${entry.id}`);
          this.readingEntryService.refetch();
        }
      )
    }
  }

  stopEditingReadingEntry() {
    this.editingReadingEntry = undefined;
  }

  /**
   * This is a bit of a hack: If you're already editing one entry and then click to edit another,
   * we want to force Angular to destroy the old EditReadingEntryComp and create another (else we have to
   * worry about leftover state).
   */
  private async stopEditingReadingEntryAndTick() {
    this.stopEditingReadingEntry();
    await wait(0);
  }
}
