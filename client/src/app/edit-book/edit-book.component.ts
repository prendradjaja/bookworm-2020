import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Book, OmitId } from "../api-types";
import { EditMode } from "../types";
import { ApiService } from '../api.service';

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

  // Other state
  errorMessage: string = '';
  isSubmitting = false;

  constructor(private apiService: ApiService) {}

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
      this.isSubmitting = true;
      this.apiService.createBook(values)
        .then(() => this.handleCancel())
        .catch(() => this.setError("Error creating book"))
        .finally(() => this.isSubmitting = false);
    } else if (this.editMode === EditMode.EXISTING) {
      const valuesWithId = {
        ...values,
        id: this.id
      }
      this.apiService.editBook(valuesWithId)
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
  private getValues(): OmitId<Book> | undefined {
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
