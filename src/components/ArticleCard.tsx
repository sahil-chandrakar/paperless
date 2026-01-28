'use client';

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Link from 'next/link';
import { Article } from '@/types/article'; 

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  const [imageFailed, setImageFailed] = useState(false);

  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, '');
  const cleanText = stripHtml(article.content);
  const readTime = Math.ceil(cleanText.split(' ').length / 200) + ' min read';

  return (
    <Link href={`/story/${article.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 4,
            paddingY: 4,
            borderBottom: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
        }}
        >
        {/* --- LEFT SIDE --- */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
            {/* 1. Author */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1.5 }}>
                <Avatar 
                    src={article.author.avatar_url || undefined} 
                    sx={{ width: 24, height: 24 }} 
                />
                <Typography variant="caption" color="text.primary" fontWeight={600} sx={{ fontFamily: 'var(--font-sans)' }}>
                    {article.author.username}
                </Typography>
            </Box>

            {/* 2. Title (FIXED: Uses text.primary for Dark Mode support) */}
            <Typography 
                variant="h5" 
                component="h2" 
                sx={{ 
                    fontWeight: 800, 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.5rem',
                    color: 'text.primary', // <--- CHANGED FROM #242424
                    marginBottom: 0.5,
                    lineHeight: 1.2
                }}
            >
                {article.title}
            </Typography>

            {/* 3. Snippet */}
            <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{
                    display: '-webkit-box',
                    overflow: 'hidden',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2, 
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1rem',
                    lineHeight: 1.5,
                    marginBottom: 2
                }}
            >
            {cleanText.substring(0, 140)}...
            </Typography>

            {/* 4. Meta Data */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 'auto' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'var(--font-sans)' }}>
                    {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'var(--font-sans)' }}>
                    • {readTime}
                </Typography>
                
                {article.tags && article.tags.length > 0 && (
                    <Chip 
                        label={article.tags[0]} 
                        size="small" 
                        sx={{ 
                            height: 24, 
                            backgroundColor: 'action.hover', // Adapts to dark mode
                            fontSize: '0.75rem', 
                            fontFamily: 'var(--font-sans)',
                            fontWeight: 500,
                            color: 'text.primary'
                        }} 
                    />
                )}
            </Box>
        </Box>

        {/* --- RIGHT SIDE: IMAGE --- */}
        {article.cover_image && !imageFailed && (
            <Box
            component="img"
            src={article.cover_image}
            onError={() => setImageFailed(true)}
            alt={article.title}
            sx={{
                width: 140,
                height: 100,
                objectFit: 'cover',
                borderRadius: 1,
                display: { xs: 'none', sm: 'block' },
                backgroundColor: 'action.selected' // Placeholder color
            }}
            />
        )}
        </Box>
    </Link>
  );
};

export default ArticleCard;