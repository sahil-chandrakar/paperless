'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import { createArticle } from '@/services/api';
// Import our new Editor
import TiptapEditor from '@/components/TiptapEditor';

export default function CreateArticle() {
  const router = useRouter();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState(''); // Stores HTML now
  const [coverImageUrl, setCoverImageUrl] = useState('');
  
  // Tags State
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  // Tag Handlers
  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  const handlePublish = async () => {
    if (!title || !content) return;
    setIsSubmitting(true);
    
    try {
      const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now();
      
      const payload = {
        title,
        content, // Sends HTML from Tiptap
        slug,
        cover_image: coverImageUrl || 'https://source.unsplash.com/random/800x600?tech',
        tags: tags // Sends ["tech", "react"]
      };

      await createArticle(payload);
      alert('Published successfully!');
      router.push('/');
      
    } catch (error) {
      console.error(error);
      alert('Failed to publish.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, paddingBottom: 8 }}>
      
      {/* Title Input */}
      <InputBase
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        multiline
        sx={{
            fontSize: '2.5rem',
            fontWeight: 900,
            fontFamily: 'var(--font-serif)',
            marginBottom: 2,
        }}
      />

      {/* Image URL Input (Simplified for brevity, use your previous code if you want the toggle) */}
      <InputBase 
        placeholder="Cover Image URL (Optional)"
        value={coverImageUrl}
        onChange={(e) => setCoverImageUrl(e.target.value)}
        fullWidth
        sx={{ mb: 4, fontSize: '0.9rem', color: 'text.secondary' }}
      />

      {/* --- NEW: RICH TEXT EDITOR --- */}
      <Box sx={{ minHeight: '300px', mb: 4 }}>
        <TiptapEditor content={content} onChange={(newContent) => setContent(newContent)} />
      </Box>

      {/* --- NEW: TAGS INPUT --- */}
      <Box sx={{ mb: 4 }}>
        <TextField
            label="Add a tag (Press Enter)"
            variant="outlined"
            size="small"
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyDown={handleAddTag}
        />
        <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {tags.map((tag) => (
                <Chip 
                    key={tag} 
                    label={tag} 
                    onDelete={() => handleDeleteTag(tag)} 
                />
            ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
            variant="contained" 
            onClick={handlePublish}
            disabled={!title || !content || isSubmitting} 
            sx={{ borderRadius: 20, px: 4 }}
        >
            {isSubmitting ? 'Publishing...' : 'Publish'}
        </Button>
      </Box>

    </Container>
  );
}