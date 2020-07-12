import { Component } from '@angular/core';
import { ApiService } from "../api.service"
import { Book } from '../api-types';
import { EditMode } from '../types';
import { wait } from '../misc';

@Component({
  selector: 'app-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss']
})
export class SandboxPageComponent {

  books$ = this.apiService.getBooks();
  readingEntries$ = this.apiService.getReadingEntries();

  // Undefined if not editing
  editingBook?: {
    editMode: EditMode,
    book?: Book // Undefined if creating a new book
  };

  constructor(private apiService: ApiService) {
    this.addBook()
  }

  async addBook() {
    await this.stopEditingBookAndTick();
    this.editingBook = {
      editMode: EditMode.NEW
    };
  }

  async editBook(book: Book) {
    await this.stopEditingBookAndTick();
    this.editingBook = {
      editMode: EditMode.EXISTING,
      book
    };
  }

  async deleteBook(book: Book) {
    this.stopEditingBook();
    await wait(0) // So that confirm() doesn't block updating ui for stopEditingBook()

    const yes = confirm("Delete book? " + book.title);
    if (yes) {
      this.apiService.deleteBook(book.id)
    }
  }

  stopEditingBook() {
    this.editingBook = undefined;
  }

  private async stopEditingBookAndTick() {
    this.stopEditingBook();
    await wait(0);
  }
}
