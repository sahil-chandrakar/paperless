import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types/article';

// 1. Create Fake Data
const DUMMY_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Understanding React Server Components',
    description: 'Why everyone is talking about RSC and how it changes the way we build Next.js applications.',
    author: { name: 'Aditya Tyagi', avatar: '/static/images/avatar/1.jpg' },
    publishedAt: '2025-01-20',
    readTime: '5 min read',
    tags: ['React', 'Next.js'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop'
  },
  {
    id: '2',
    title: 'The Art of Clean Code',
    description: 'Writing code is easy. Writing code that humans can understand is the real challenge. Here are 5 principles I follow.',
    author: { name: 'Jane Doe', avatar: '/static/images/avatar/2.jpg' },
    publishedAt: '2025-01-18',
    readTime: '8 min read',
    tags: ['Programming', 'Clean Code'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=300&fit=crop'
  },
  {
    id: '3',
    title: 'Why I Switched from VS Code to Neovim',
    description: 'A personal journey into the world of terminal-based editors and why I can never go back.',
    author: { name: 'Dev Guy', avatar: '/static/images/avatar/3.jpg' },
    publishedAt: '2025-01-15',
    readTime: '12 min read',
    tags: ['Productivity', 'Tools'],
    // No thumbnail for this one to test our conditional rendering
  }
];

export default function Home() {
  return (
    <Box sx={{ maxWidth: '700px', margin: '0 auto', marginTop: 4 }}> 
      
      {/* Feed Header */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4, pb: 2 }}>
         <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1 }}>
            For You
         </Typography>
      </Box>

      {/* 2. Map through the data and render cards */}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {DUMMY_ARTICLES.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </Box>
    </Box>
  );
}