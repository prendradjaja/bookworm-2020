import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sandbox-page',
  templateUrl: './sandbox-page.component.html',
  styleUrls: ['./sandbox-page.component.scss']
})
export class SandboxPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log("Error", error))
  }
}
