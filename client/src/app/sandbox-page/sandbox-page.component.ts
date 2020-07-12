import { Component } from '@angular/core';
import { ApiService } from "../api.service"

@Component({
  selector: 'app-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss']
})
export class SandboxPageComponent {

  books$ = this.apiService.getBooks();
  readingEntries$ = this.apiService.getReadingEntries();

  constructor(private apiService: ApiService) {}

  addBook() {
  }
}
