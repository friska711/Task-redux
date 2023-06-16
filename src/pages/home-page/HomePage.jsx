import React, { useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/localStorage';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../store/postSlice';
import { PostForm } from '../../components/Feed/PostForm';
import { Feed } from '../../components/Feed/Feed';

export const HomePage = () => {
  const [credentials] = useLocalStorage('credential');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    !credentials && navigate('/login');
  }, [credentials, navigate]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      <div style={{ maxWidth: 1080, margin: 'auto' }}>
        <Grid container spacing={1}>
          <Grid item md={3} lg={3}></Grid>
          <Grid item md={3} lg={9}>
            <Typography variant="h4">Feeds</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={3} lg={3}>
            <PostForm />
          </Grid>
          <Grid item md={3} lg={9}>
            <Feed />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
