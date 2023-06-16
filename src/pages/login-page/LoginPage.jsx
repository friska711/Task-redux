import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { useLocalStorage } from '../../hooks/localStorage';
import { useNavigate } from 'react-router-dom';
import { ButtonGoogleLogin } from '../../components/ButtonGoogleLogin';

export const LoginPage = () => {
  const [credentials] = useLocalStorage('credential');
  const navigate = useNavigate();

  useEffect(() => {
    credentials && navigate('/home');
  }, [credentials, navigate]);

  return (
    <div style={{ textAlign: 'center' }}>
      <Typography variant="h1">Login Page</Typography>
      <ButtonGoogleLogin />
    </div>
  );
};
