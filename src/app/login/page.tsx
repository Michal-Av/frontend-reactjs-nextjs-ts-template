// Root Component: LoginComp
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Paper, Typography } from '@mui/material';
import FormComponent from '../../components/Containers/Form/FormComponent';
import { login, signup, forgot_pass } from '@/services/api-auth';

const LoginComp = () => {
  const [signupMode, setSignupMode] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setMessage(''), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleLogin = async (formData: { username: string; password: string }) => {
    try {
      const response = await login(formData.username, formData.password);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('csrfToken', response.csrfToken);
      router.push('/home');
    } catch {
      setMessage('User Name or password incorrect'); 
    }
  };
  
  const handleSignup = async (formData: { email: string; username: string; password: string }) => {
    try {
      await signup(formData.email, formData.username, formData.password);
      setMessage('User Created!'); 
      setSignupMode(false); 
    } catch {
      setMessage('User not created. Please try again.'); 
    }
  };
  

  const handleForgotPassword = async (formData: { email: string }) => {
    try {
      await forgot_pass(formData.email);
      alert('A link will be sent to your email to reset the password.');
      setForgotMode(false);
    } catch {
      setMessage('Failed to process the request. Please try again.');
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #4facfe,rgb(0, 10, 65))',
        padding: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 8,
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          {signupMode ? 'Sign Up' : forgotMode ? 'Forgot Password' : 'Log In'}
        </Typography>
        <br />
        {message && (
          <Typography color="error" variant="body2" gutterBottom>
            {message}
          </Typography>
        )}
        <FormComponent
          signupMode={signupMode}
          forgotMode={forgotMode}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          handleForgotPassword={handleForgotPassword}
          setSignupMode={setSignupMode}
          setForgotMode={setForgotMode}
          setMessage={setMessage}
        />
      </Paper>
    </Box>
  );
};

export default LoginComp;
