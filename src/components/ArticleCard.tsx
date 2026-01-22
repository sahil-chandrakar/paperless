'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Article } from '@/types/article'; // Import our interface

// We define props so this component expects an 'article' object
interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align to top
        gap: 4,
        paddingY: 4,
        borderBottom: '1px solid',
        borderColor: 'divider', // Uses the theme's divider color (light/dark aware)
        cursor: 'pointer',
      }}
    >
      {/* --- LEFT SIDE: CONTENT --- */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
        
        {/* Author Row */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: 1 }}>
          <Avatar 
            src={article.author.avatar} 
            sx={{ width: 24, height: 24 }} 
          />
          <Typography variant="caption" color="text.primary" fontWeight={500}>
            {article.author.name}
          </Typography>
        </Box>

        {/* Title */}
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: 'var(--font-serif)', // Force Serif
            marginBottom: 0.5 
          }}
        >
          {article.title}
        </Typography>

        {/* Description (Hidden on very small screens usually, but we keep it simple) */}
        <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2, // Limits text to 2 lines and adds "..."
                fontFamily: 'var(--font-serif)', 
                marginBottom: 1
            }}
        >
          {article.description}
        </Typography>

        {/* Footer Metadata (Date, Tag, Read Time) */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 'auto' }}>
          <Typography variant="caption" color="text.secondary">
            {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </Typography>
          
          <Typography variant="caption" color="text.secondary">
             • {article.readTime}
          </Typography>

          {/* Render just the first tag to keep it clean */}
          <Chip 
            label={article.tags[0]} 
            size="small" 
            sx={{ 
                height: 24, 
                backgroundColor: 'action.hover', // Subtle background
                fontSize: '0.75rem' 
            }} 
          />
        </Box>
      </Box>

      {/* --- RIGHT SIDE: IMAGE (Only render if it exists) --- */}
      {article.thumbnailUrl && (
        <Box
          component="img"
          src={article.thumbnailUrl}
          alt={article.title}
          sx={{
            width: 160, // Fixed width
            height: 107, // Fixed height (golden ratio-ish)
            objectFit: 'cover', // Prevents stretching
            borderRadius: 1,
            display: { xs: 'none', sm: 'block' } // Hide on mobile (xs), show on desktop (sm+)
          }}
        />
      )}
    </Box>
  );
};

export default ArticleCard;