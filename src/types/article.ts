export interface Article {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string; // ISO Date string
  readTime: string;    // e.g., "5 min read"
  tags: string[];
  thumbnailUrl?: string; // Optional (some articles might not have images)
}