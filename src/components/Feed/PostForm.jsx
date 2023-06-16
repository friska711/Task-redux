import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPost } from '../../store/postSlice';

export const PostForm = () => {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (content.trim() !== '') {
      dispatch(createPost({ content }));
      setContent('');
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Create Post
        </Typography>
        <TextField
          multiline
          rows={4}
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Post
        </Button>
      </CardContent>
    </Card>
  );
};
