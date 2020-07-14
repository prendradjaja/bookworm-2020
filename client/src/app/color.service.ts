import { Injectable } from "@angular/core";
import { Book } from './api-types';

@Injectable({
  providedIn: "root"
})
export class ColorService {
  /**
   * Adapted from https://stackoverflow.com/a/16348977
   */
  public getColor(book: Book): string {
    const title = book.title;
    if (book.color) {
      return book.color;
    }
    var hash = 0;
    for (var i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = "#";
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xff;
      colour += ("00" + value.toString(16)).substr(-2);
    }
    return colour;
  }
}
