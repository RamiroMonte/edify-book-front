export interface IBooks {
  id: string;
  title: string;
  subtitle: string;
  description: null;
  page_count: null;
  published_date: Date;
  image_url: null;
  user_rating: null;
  starting_read: Date;
  finished_read: null;
  created_at: Date;
  updated_at: Date;
  user_id: string;
  Author: Author[];
  BookMeta: BookMeta[];
}

export interface Author {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export interface BookMeta {
  id: string;
  book_id: string;
  meta_key: string;
  meta_value: string;
  created_at: Date;
  updated_at: Date;
}
