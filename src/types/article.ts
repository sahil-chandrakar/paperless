export interface Author {
  username: string;
  avatar_url?: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  content: string; // The full HTML/Text body
  cover_image?: string;
  created_at: string;
  author: Author; // Nested object
  tags?: string[]; // Optional for now
}