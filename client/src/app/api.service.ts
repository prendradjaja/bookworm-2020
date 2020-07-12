import { Injectable } from '@angular/core';
import { Book, ReadingEntry, OmitId } from "./api-types";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // TODO switch to angular http

  constructor() { }

  public getBooks(): Promise<Book[]> {
    return fetch('/api/books')
      .then(response => response.json());
  }

  public createBook(book: OmitId<Book>): Promise<void> {
    console.error("Unimplemented: Create book", book)
    return;
  }

  public editBook(book: Book): Promise<void> {
    console.error("Unimplemented: Edit book", book)
    return;
  }

  public getReadingEntries(): Promise<ReadingEntry[]> {
    return fetch('/api/reading_entries')
      .then(response => response.json());
  }
}
