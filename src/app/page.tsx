'use client';

import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Link from 'next/link';
import { getArticles } from '@/services/api'; 
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types/article';

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesData = await getArticles();
        setArticles(articlesData);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Container><Typography sx={{ mt: 4 }}>Loading...</Typography></Container>;

  const staffPicks = articles.slice(0, 3);

  return (
    // 1. USE 'xl' container to allow full width, but we center the content inside manually
    <Container maxWidth="xl" sx={{ marginTop: 8, px: { xs: 2, md: 4 } }}>
      
      <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'flex-start',
          // 2. THE FIX: 'center' packs the columns together in the middle of the screen
          justifyContent: 'center', 
          // 3. FIXED GAP: Keeps the sidebar at a perfect distance from the feed
          gap: { xs: 0, md: 8 } 
      }}>
        
        {/* === LEFT COLUMN: MAIN FEED === */}
        {/* We limit width to 720px so it matches the editorial look */}
        <Box sx={{ flex: 1, width: '100%', maxWidth: '720px', minWidth: 0 }}>
          <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 4, pb: 2 }}>
             <Typography variant="caption" sx={{ 
                fontWeight: 700, 
                color: 'text.secondary', 
                letterSpacing: '1px',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem'
             }}>
                FOR YOU
             </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Box>
        </Box>

        {/* === RIGHT COLUMN: SIDEBAR === */}
        <Box 
          sx={{ 
            width: { xs: '100%', md: '340px' }, // Fixed width for sidebar
            flexShrink: 0, 
            position: 'sticky', 
            top: 100,
            borderLeft: { md: '1px solid' },
            borderColor: { md: 'divider' },
            pl: { md: 4 }, // Padding inside the sidebar
            pt: { xs: 4, md: 0 },
            // Optional: Hide sidebar on smaller tablets if it gets too crowded
            display: { xs: 'block', sm: 'block' } 
          }}
        >
            <Typography variant="h6" sx={{ 
                fontWeight: 700, 
                mb: 3, 
                fontSize: '0.9rem',
                fontFamily: 'var(--font-sans)',
                color: 'text.primary'
            }}>
            Top Picks
            </Typography>
            
            {staffPicks.map((pick) => (
              <Link key={pick.id} href={`/story/${pick.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Box sx={{ mb: 3, cursor: 'pointer' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                       <Avatar 
                         src={pick.author.avatar_url || undefined} 
                         sx={{ width: 20, height: 20 }} 
                       />
                       <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ fontFamily: 'var(--font-sans)' }}>
                         {(pick.author.username).toUpperCase()}
                       </Typography>
                    </Box>
                    
                    <Typography variant="subtitle2" sx={{ 
                        fontWeight: 700, 
                        lineHeight: 1.4, 
                        fontSize: '1rem',
                        fontFamily: 'var(--font-serif)', 
                        color: 'text.primary'
                    }}>
                        {pick.title}
                    </Typography>
                </Box>
              </Link>
            ))}

            {/* <Box sx={{ my: 4 }}>
                <Typography 
                    component="span" 
                    sx={{ color: '#1a8917', fontSize: '0.85rem', cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                >
                    See full list
                </Typography>
            </Box> */}

        </Box>
      </Box>
    </Container>
  );
}