import React from 'react';
import { useState, useEffect } from 'react';
import { Modal, Box, Typography, Button, ButtonGroup } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, fetchPosts, deletePost, updatePost } from '../../store/postSlice';
import { PostFeed } from './PostFeed';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

export const Feed = () => {
  const posts = useSelector(selectPosts);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState('');

  const handleDeleteModal = (id) => {
    setPostId(id);
    setOpen(true);
  };

  const handleDelete = async () => {
    await dispatch(deletePost(postId));
    setOpen(false);
  };

  const handleUpdate = async (id, updatedPost) => {
    await dispatch(updatePost({ id, post: updatedPost }));
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <Modal open={open}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            This action cannot be rolled back.
          </Typography>
          <ButtonGroup>
            <Button onClick={handleDelete}>Yes</Button>
            <Button color="error" onClick={() => setOpen(false)}>
              No
            </Button>
          </ButtonGroup>
        </Box>
      </Modal>
      {posts.map((post) => (
        <PostFeed
          post={post}
          handleDeleteModal={handleDeleteModal}
          handleUpdate={handleUpdate}
          key={post.id}
        />
      ))}
    </div>
  );
};


