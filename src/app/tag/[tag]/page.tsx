'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Correct way to get params in Client Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getArticlesByTag } from '@/services/api'; 
import ArticleCard from '@/components/ArticleCard';
import { Article } from '@/types/article';

export default function TagPage() {
  const params = useParams();
  // decodeURIComponent fixes "%20" turning back into spaces
  const tagName = typeof params.tag === 'string' ? decodeURIComponent(params.tag) : '';

  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tagName) return;

    const fetchData = async () => {
      try {
        const data = await getArticlesByTag(tagName);
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles for tag", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tagName]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 10 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="overline" color="text.secondary" fontWeight={700}>
          TOPIC
        </Typography>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '3.5rem' }, 
            fontWeight: 800, 
            fontFamily: 'var(--font-serif)',
            textTransform: 'capitalize',
            mb: 2,
            color: 'text.primary'
          }}
        >
          {tagName}
        </Typography>
        <Divider />
      </Box>

      {/* Content Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" gutterBottom>
              No stories found for "{tagName}" yet.
            </Typography>
            <Button 
                component={Link} 
                href="/create" 
                variant="outlined" 
                sx={{ mt: 2, borderRadius: 20, textTransform: 'none' }}
            >
                Write the first one
            </Button>
          </Box>
        )}
      </Box>
      
      {/* Back Button */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Button startIcon={<ArrowBackIcon />} component={Link} href="/" color="inherit">
            Back to Home
        </Button>
      </Box>
    </Container>
  );
}