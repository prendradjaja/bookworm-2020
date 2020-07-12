export type OmitId<T> = Omit<T, 'id'>;

export interface Book {
  id: number;
  title: string;
  color?: string;
}

export interface ReadingEntry {
  id: number;
  book_id: number;
  start_place: string;
  end_place: string;
  notes: string;
  created_at: string; // TODO date handling/parsing?
}