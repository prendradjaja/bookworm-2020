import { Injectable } from '@angular/core';
import { Book } from './api-types';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private itemsSubject = new BehaviorSubject<Book[]>([]);
  public items$: Observable<Book[]> = this.itemsSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.refetch();
  }

  refetch(): void {
    this.apiService.getBooks().then(
      result => this.itemsSubject.next(result)
    );
  }
}
