import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useLocalStorage } from '../hooks/localStorage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../store/postSlice';

export const ButtonGoogleLogin = () => {
  const [, setCredential] = useState(null);
  const [credentialStorage, setCredentialStorage] = useLocalStorage('credential');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCredentialSuccess = (response) => {
    const { credential } = response;
    setCredential(credential);
    setCredentialStorage(credential);
    dispatch(setCredentials(credential)); // Dispatching action to set credentials in Redux store
  };

  const onCredentialError = (error) => {
    console.log(error);
  };

  useEffect(() => {
    if (credentialStorage) {
      setCredential(credentialStorage);
      navigate('/home');
    }
  }, [credentialStorage, navigate]);

  return (
    <div>
      <GoogleLogin onSuccess={onCredentialSuccess} onError={onCredentialError} />
    </div>
  );
};
