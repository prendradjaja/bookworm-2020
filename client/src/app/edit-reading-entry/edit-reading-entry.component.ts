import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EditMode } from '../types';
import { ReadingEntry, OmitId, ReadingEntryCreationBody } from '../api-types';
import { ApiService } from '../api.service';

@Component({
  selector: 'edit-reading-entry',
  templateUrl: './edit-reading-entry.component.html',
  styleUrls: ['./edit-reading-entry.component.scss']
})
export class EditReadingEntryComponent implements OnInit {
  @Input() public editMode: EditMode;
  // Must be provided if and only if editMode === 'existing'
  @Input() public readingEntry?: ReadingEntry;
  @Output() public cancel = new EventEmitter<void>();

  id?: number;

  // Form values
  // TODO Add book_id control -- First let's create a shared store for books (and a route guard)
  book_id: number = 24;
  start_place: string = '';
  end_place: string = '';
  notes: string = '';

  // Other state
  errorMessage: string = '';
  isSubmitting = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    if (this.readingEntry) {
      this.id = this.readingEntry.id;
      // TODO Fill in form values (for "update" use case)
    }
  }

  submit() {
    const values = this.getValues();
    if (!values) {
      return;
    }

    let promise;
    if (this.editMode === EditMode.NEW) {
      promise = this.apiService.createReadingEntry(values);
    } else if (this.editMode === EditMode.EXISTING) {
      const valuesWithId = {
        ...values,
        id: this.id
      }
      // promise = this.apiService.editReadingEntry(valuesWithId);
      console.error("Unimplemented: Update reading entry")
      return;
    } else {
      // Impossible
      // TODO: Add type safety via ts-essentials "unreachable case"
      console.error("Unreachable case:", this.editMode)
    }

    this.isSubmitting = true;
    promise
      .then(() => this.handleCancel())
      .catch(() => this.setError("Server error"))
      .finally(() => this.isSubmitting = false);
  }

  handleCancel() {
    this.cancel.next();
  }

  /**
   * Enforces "required" constraint and:
   * - Returns values as an object if valid, OR
   * - Returns undefined if invalid
   */
  private getValues(): ReadingEntryCreationBody | undefined {
    // TODO Actually implement book_id (and as required, unlike other values here)
    const book_id = this.book_id;

    const start_place = this.start_place.trim() || undefined;
    const end_place = this.end_place.trim() || undefined;
    const notes = this.notes.trim() || undefined;

    return { book_id, start_place, end_place, notes };
  }

  private setError(message: string) {
    this.errorMessage = message;
  }
}
