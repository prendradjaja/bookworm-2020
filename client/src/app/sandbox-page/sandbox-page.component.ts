import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss']
})
export class SandboxPageComponent implements OnInit {

  books$ = fetch('/api/books').then(response => response.json());
  readingEntries$ = fetch('/api/reading_entries').then(response => response.json());

  constructor() { }

  ngOnInit(): void {
  }
}
