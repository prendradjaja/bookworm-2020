import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ReadingEntry } from './api-types';

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent implements OnInit {
  @Input() row: ReadingEntry;

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();

  // constructor(private colorService: ColorService) {}

  ngOnInit() {}

  handleClick(who: string) {
    this.onClick.emit(who);
  }

  getColor(): string {
    // return this.colorService.getColor(this.row.book);
    return
  }
}
