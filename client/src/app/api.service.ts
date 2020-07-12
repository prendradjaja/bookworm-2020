import { Injectable } from '@angular/core';
import { Book, ReadingEntry, OmitId } from "./api-types";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // TODO switch to angular http

  constructor() { }

  public getBooks(): Promise<Book[]> {
    return this.myFetch('/api/books')
      .then(response => response.json());
  }

  public createBook(book: OmitId<Book>): Promise<void> {
    return this.myFetch('/api/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    })
    .then();
  }

  public editBook(book: Book): Promise<void> {
    console.error("Unimplemented: Edit book", book)
    return;
  }

  public deleteBook(id: number): Promise<void> {
    console.error("Unimplemented: Delete book", id)
    return
  }

  public getReadingEntries(): Promise<ReadingEntry[]> {
    return this.myFetch('/api/reading_entries')
      .then(response => response.json());
  }

  /**
   * Rejects upon non-2XX (fetch doesn't do this!).
   *
   * I could put other stuff (like response.json()) here, but probably it's best not to go too
   * far down this path since I probably want to migrate to Angular's HttpClient anyway.
   */
  private myFetch(input, init?) {
    return fetch(input, init)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error from server');
        }
        return response;
      })
  }
}
