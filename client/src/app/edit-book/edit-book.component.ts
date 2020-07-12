import { Component, OnInit } from '@angular/core';
import { Book } from "../api-types";

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  title: string = '';
  color: string = '';
  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
  }

  submit() {
    console.log(this.getValues());
  }

  /**
   * Enforces "required" constraint and:
   * - Returns values as an object if valid, OR
   * - Returns undefined if invalid
   */
  private getValues(): Omit<Book, "id"> | undefined {
    const title = this.title.trim();
    if (!title) {
      this.setError("Title is required");
      return undefined;
    }

    let color = this.color.trim();
    if (!color) {
      color = undefined;
    }

    return { title, color }
  }

  private setError(message: string) {
    this.errorMessage = message;
  }
}
