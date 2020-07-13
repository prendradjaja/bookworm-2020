export type OmitId<T> = Omit<T, 'id'>;

export interface Book {
  id: number;
  title: string;
  color?: string;
}

// TODO Replace existing OmitId<Book> with this where applicable
export type BookCreationBody = OmitId<Book>;

export interface ReadingEntry {
  id: number;
  book_id: number;
  start_place?: string;
  end_place?: string;
  notes?: string;
  created_at: string; // TODO date handling/parsing?
}

export type ReadingEntryCreationBody = Omit<ReadingEntry, 'id' | 'created_at'>