import { Injectable } from '@angular/core';
import { Book, ReadingEntry } from "./api-types";

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

  public getReadingEntries(): Promise<ReadingEntry[]> {
    return fetch('/api/reading_entries')
      .then(response => response.json());
  }
}
