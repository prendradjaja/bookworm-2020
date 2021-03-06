import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { HydratedReadingEntry } from './api-types';
import { ColorService } from './color.service'

@Component({
  selector: "app-event-card",
  templateUrl: "./event-card.component.html",
  styleUrls: ["./event-card.component.scss"]
})
export class EventCardComponent implements OnInit {
  @Input() row: HydratedReadingEntry;

  @Output() onClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();

  constructor(private colorService: ColorService) {}

  ngOnInit() {}

  handleClick(who: string) {
    this.onClick.emit(who);
  }

  handleDelete() {
    this.delete.emit();
  }

  handleEdit() {
    this.edit.emit();
  }

  getColor(): string {
    return this.colorService.getColor(this.row.book);
  }
}
