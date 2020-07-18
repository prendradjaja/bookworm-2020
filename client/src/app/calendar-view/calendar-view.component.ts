import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  Output,
  EventEmitter
} from "@angular/core";
import { ColorService } from "../color.service";
import { HydratedReadingEntry } from '../api-types';
import { DateTime } from 'luxon';

@Component({
  selector: "calendar-view",
  templateUrl: "./calendar-view.component.html",
  styleUrls: ["./calendar-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarViewComponent implements OnInit, OnChanges {
  @Input() allRows: HydratedReadingEntry[];
  // @Input() currentDateFilter: Date;
  // @Output() filterByDate = new EventEmitter<Date>();

  weeks = [];
  showFullCalendar = false;
  private eventsByDate: { [date: string]: HydratedReadingEntry[] };

  constructor(
    private colorService: ColorService,
  ) {}

  ngOnInit() {}

  ngOnChanges() {
    this.computeEventsByDate();
    this.computeWeeks();
    // Will this component actually handle changes properly? Should it need to?
  }

  visibleWeeks() {
    if (this.showFullCalendar) {
      return this.weeks;
    }
    return this.weeks.slice(this.weeks.length - 2);
  }

  toggleCalendar() {
    this.showFullCalendar = !this.showFullCalendar;
  }

  // public clickCalendarDay(e) {
  //   this.filterByDate.emit(e.fullDate as Date);
  // }

  private computeEventsByDate(): void {
    this.eventsByDate = {};
    this.allRows.forEach(row => {
      const key = DateTime.fromISO(row.created_at).toLocal().startOf('day').toString();
      if (this.eventsByDate[key]) {
        this.eventsByDate[key].push(row);
      } else {
        this.eventsByDate[key] = [row];
      }
    });
  }

  private computeWeeks() {
    // TODO Figure out better naming for weekDates and weekUis?
    let weekDate = DateTime.fromObject({ year: 2020, month: 7, day: 13 });
    this.weeks = [];
    const endWeek = DateTime
      .local()
      .startOf('week');
    for (; weekDate <= endWeek; weekDate = weekDate.plus({week: 1})) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        const date = weekDate.plus({days: i});
        week.push(this.makeDay(date));
      }
      this.weeks.push(week);
    }
  }

  private makeDay(d: DateTime) {
    // TODO add typing to the day object
    const day = {
      d: d.day,
      fullDate: d
    } as any;

    // "today" = the current day we're iterating on
    const todaysEvents = this.eventsByDate[d.toString()];

    if (!todaysEvents) {
      day.numEvents = 0;
      return day;
    }

    const colors = new Set();
    todaysEvents.forEach(row => {
      colors.add(this.colorService.getColor(row.book));
    });
    if (colors.size === 1) {
      day.color = oneItemSetToItem(colors);
    } else if (colors.size === 2) {
      // topColor is the color of the last (most recent) entry on this day

      // this computation of lastBook is dependent on db rows being sorted by createdAt
      const lastBook = todaysEvents[todaysEvents.length - 1].book;
      const lastColor = this.colorService.getColor(lastBook);
      day.multiColor = true;
      // TODO the more frequent one should be on top
      const [color1, color2] = twoItemSetToArray(colors);
      if (color1 === lastColor) {
        [day.topColor, day.rightColor] = [color1, color2];
      } else if (color2 === lastColor) {
        [day.topColor, day.rightColor] = [color2, color1];
      } else {
        [day.topColor, day.rightColor] = [color1, color2];
        console.warn("Neither color is lastColor");
      }
    } else if (colors.size > 2) {
      day.multiColor = true;
      day.topColor = getAnyItem(colors);
      day.rightColor = "black";
    } else {
      day.color = "black";
    }
    day.numEvents = todaysEvents.length;

    if (anyIsEnd(todaysEvents)) {
      day.endOfBook = true;
    }
    return day;
  }
}

function oneItemSetToItem<T>(s: Set<T>): T {
  if (s.size !== 1) {
    window.alert("this set is not a one item set");
  } else {
    let items = [];
    s.forEach(x => items.push(x));
    return items[0];
  }
}

function twoItemSetToArray<T>(s: Set<T>): T[] {
  if (s.size !== 2) {
    window.alert("this set is not a two item set");
  } else {
    let items = [] as T[];
    s.forEach(x => items.push(x));
    return items;
  }
}

function getAnyItem<T>(s: Set<T>): T[] {
  if (s.size < 1) {
    window.alert("this set is empty");
  } else {
    let items = [];
    s.forEach(x => items.push(x));
    return items[0];
  }
}

function anyIsEnd(rows: HydratedReadingEntry[]) {
  return rows.some(x => x.notes === "end");
}
