import { Component, Input, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';
import { Book, OmitId, BookCreationBody } from "../api-types";
import { EditMode } from "../types";
import { ApiService } from '../api.service';
import { BookService } from '../book.service';

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
  @HostBinding('style.border-left-color')
  color: string = '';

  // Other state
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private apiService: ApiService,
    private bookService: BookService
  ) {}

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

    let promise;
    if (this.editMode === EditMode.NEW) {
      promise = this.apiService.createBook(values);
    } else if (this.editMode === EditMode.EXISTING) {
      const valuesWithId = {
        ...values,
        id: this.id
      }
      promise = this.apiService.editBook(valuesWithId);
    } else {
      // Impossible
      // TODO: Add type safety via ts-essentials "unreachable case"
      console.error("Unreachable case:", this.editMode)
    }

    this.isSubmitting = true;
    promise
      .then(() => this.handleCancel())
      .catch(() => this.setError("Server error"))
      .finally(() => this.isSubmitting = false)
      .then(() => this.bookService.refetch());
  }

  handleCancel() {
    this.cancel.next();
  }

  /**
   * Enforces "required" constraint and:
   * - Returns values as an object if valid, OR
   * - Returns undefined if invalid
   */
  private getValues(): BookCreationBody | undefined {
    const title = this.title.trim();
    if (!title) {
      this.setError("Title is required");
      return undefined;
    }

    const color = this.color.trim() || undefined;

    return { title, color }
  }

  private setError(message: string) {
    this.errorMessage = message;
  }
}
