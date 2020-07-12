import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Book } from "../api-types";
import { EditMode } from "../types";

@Component({
  selector: 'edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss']
})
export class EditBookComponent implements OnInit {
  @Input() public editMode: EditMode;
  // Must be provided if and only if editMode === 'existing'
  @Input() public book?: Book;

  @Output() public cancel = new EventEmitter<void>();

  id?: number;

  // Form values
  title: string = '';
  color: string = '';

  errorMessage: string = '';

  constructor() {}

  ngOnInit(): void {
    if (this.book) {
      this.id = this.book.id;
      this.title = this.book.title;
      this.book.color && (this.color = this.book.color);
    }
  }

  submit() {
    const values = this.getValues();
    if (!values) {
      return;
    }

    if (this.editMode === EditMode.NEW) {
      console.log(values);
    } else if (this.editMode === EditMode.EXISTING) {
      const valuesWithId = {
        ...values,
        id: this.id
      }
      console.log(valuesWithId);
    } else {
      // Impossible
      // TODO: Add type safety via ts-essentials "unreachable case"
      console.error("Unreachable case:", this.editMode)
    }
  }

  handleCancel() {
    this.cancel.next();
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
