import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { EditMode } from '../types';
import { Book } from '../api-types';
import { wait } from '../misc';
import { ApiService } from '../api.service';

@Component({
  selector: 'books-page',
  templateUrl: './books-page.component.html',
  styleUrls: ['./books-page.component.scss']
})
export class BooksPageComponent implements OnInit {

  books$ = this.bookService.items$;

  // Undefined if not editing
  editingBook?: {
    editMode: EditMode,
    book?: Book // Undefined if creating a new book
  };

  constructor(
    private bookService: BookService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
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
      this.apiService.deleteBook(book.id).then(
        () => {
          console.info(`Deleted book ${book.id} (${book.title})`);
          this.bookService.refetch();
        }
      )
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
