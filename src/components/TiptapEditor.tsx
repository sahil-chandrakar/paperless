'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder'; // Import the new plugin
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import TitleIcon from '@mui/icons-material/Title';

interface EditorProps {
  content: string;
  onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <Box sx={{ display: 'flex', gap: 0.5, marginBottom: 1, opacity: 0.7, '&:hover': { opacity: 1 } }}>
      <IconButton onClick={() => editor.chain().focus().toggleBold().run()} size="small"
        color={editor.isActive('bold') ? 'primary' : 'default'}>
        <FormatBoldIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} size="small"
        color={editor.isActive('italic') ? 'primary' : 'default'}>
        <FormatItalicIcon fontSize="small" />
      </IconButton>
      <IconButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} size="small"
        color={editor.isActive('heading', { level: 2 }) ? 'primary' : 'default'}>
        <TitleIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

const TiptapEditor = ({ content, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Tell your story...', // The grey text you missed!
      }),
    ],
    content: content,
    immediatelyRender: false, 
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        // MATCHING THE "GOOD" UI FONTS
        class: 'focus:outline-none', 
        style: 'min-height: 400px; font-size: 1.25rem; font-family: var(--font-serif); line-height: 1.8; color: rgba(0, 0, 0, 0.87);',
      },
    },
  });

  return (
    <Box>
      {/* Minimal Toolbar that doesn't look like a box */}
      <MenuBar editor={editor} />
      
      {/* The Editor itself - No borders, pure text */}
      <EditorContent editor={editor} />
    </Box>
  );
};

export default TiptapEditor;