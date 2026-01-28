'use client';

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { Article } from '@/types/article';
import { getArticleBySlug } from '@/services/api';

export default function ArticleDetail({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        const data = await getArticleBySlug(resolvedParams.slug);
        setArticle(data);
      } catch (err) {
        console.error("Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
        <Typography>Loading story...</Typography>
      </Container>
    );
  }

  if (!article) {
    return (
      <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h3">404</Typography>
        <Typography variant="h5" color="text.secondary">Story not found.</Typography>
      </Container>
    );
  }

  const cleanText = article.content.replace(/<[^>]*>?/gm, '');
  const readTime = Math.ceil(cleanText.split(' ').length / 200) + ' min read';

  return (
    <Container maxWidth="md" sx={{ marginTop: 8, paddingBottom: 10 }}>
      
      {/* TITLE */}
      <Typography 
        variant="h1" 
        component="h1" 
        sx={{ 
          fontSize: { xs: '2rem', md: '3rem' }, 
          mb: 4, 
          fontWeight: 900,
          fontFamily: 'var(--font-serif)',
          lineHeight: 1.1,
          color: 'text.primary' // Ensure title respects theme
        }}
      >
        {article.title}
      </Typography>

      {/* AUTHOR HEADER */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 6 }}>
        <Avatar 
            src={article.author.avatar_url || undefined} 
            sx={{ width: 48, height: 48, mr: 2 }} 
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            {article.author.username}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, color: 'text.secondary' }}>
            <Typography variant="caption">
              {new Date(article.created_at).toLocaleDateString()}
            </Typography>
            <Typography variant="caption">·</Typography>
            <Typography variant="caption">{readTime}</Typography>
          </Box>
        </Box>
      </Box>

      {/* COVER IMAGE */}
      {article.cover_image && !imageFailed && (
        <Box 
          component="img"
          src={article.cover_image}
          onError={() => setImageFailed(true)}
          sx={{ 
            width: '100%', 
            maxHeight: '500px', 
            objectFit: 'cover', 
            borderRadius: 2,
            mb: 6
          }}
        />
      )}

      {/* BODY CONTENT */}
      <div 
        className="prose"
        style={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8, 
            // FIX: Replaced hardcoded black with 'inherit' so it takes the parent's theme color
            color: 'inherit', 
            fontFamily: 'var(--font-serif)',
        }}
        dangerouslySetInnerHTML={{ __html: article.content }} 
      />

      {/* FOOTER TAGS */}
      {article.tags && article.tags.length > 0 && (
        <Box sx={{ mt: 8 }}>
            {article.tags.map((tag) => (
                <Chip 
                    key={tag} 
                    label={tag} 
                    sx={{ 
                        mr: 1, 
                        mb: 1,
                        backgroundColor: 'action.hover', // Adapts to dark mode
                        color: 'text.primary' 
                    }} 
                />
            ))}
        </Box>
      )}

      <Divider sx={{ my: 6 }} />

    </Container>
  );
}