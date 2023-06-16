import axios from 'axios';
import { config } from '../config';

const baseURL = 'https://msib-feb3-objectstorage.productzillaacademy.com/collections';
const client = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${config.google.clientId}`,
  },
});

export const getPosts = async () => {
  const response = await client.get('/posts', {
    params: {
      sort: '-timestamp',
    },
  });
  return response.data;
};

export const createPost = async (post) => {
  const response = await client.post('/posts', post);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await client.delete(`/posts/id/${id}`);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await client.put(`/posts/id/${id}`, post);
  return response.data;
};
