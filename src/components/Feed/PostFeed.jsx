import React, { useState } from 'react';
import { Avatar, Card, CardContent, Grid, Button, ButtonGroup, Typography, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../store/postSlice';
import TimeAgo from 'timeago-react';

export const PostFeed = ({ post, handleDeleteModal }) => {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedContent(post.content);
  };

  const handleSave = () => {
    if (editedContent.trim() !== '') {
      dispatch(updatePost({ id: post.id, content: editedContent }));
      setEditing(false);
    }
  };

  const handleDelete = () => {
    handleDeleteModal(post.id);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar alt={post.author} src={post.avatar} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2">{post.author}</Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  <TimeAgo datetime={post.timestamp} />
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <ButtonGroup>
              {!editing ? (
                <>
                  <Button onClick={handleEdit}>Edit</Button>
                  <Button color="error" onClick={handleDelete}>
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleSave}>Save</Button>
                  <Button color="error" onClick={handleCancel}>
                    Cancel
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Grid>
        </Grid>
        {!editing ? (
          <Typography>{post.content}</Typography>
        ) : (
          <TextField
            multiline
            rows={4}
            fullWidth
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        )}
      </CardContent>
    </Card>
  );
};


