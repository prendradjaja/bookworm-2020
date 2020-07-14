import { Injectable } from '@angular/core';
import { HydratedReadingEntry } from './api-types';
import { ApiService } from './api.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReadingEntryService {

  private itemsSubject = new BehaviorSubject<HydratedReadingEntry[]>([]);
  public items$: Observable<HydratedReadingEntry[]> = this.itemsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.refetch();
  }

  refetch(): void {
    this.apiService.getReadingEntries().then(
      result => this.itemsSubject.next(result)
    );
  }
}
