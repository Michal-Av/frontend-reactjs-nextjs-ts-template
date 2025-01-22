'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Containers/Form/Form';
import ButtonLink from '@/components/UIElements/ButtonLink';
import Image from 'next/image';
import { login, signup, forgot_pass } from '@/services/api-auth';
import '@/styles/Login.css';
import Logo from '@/assets/images/logo/3.png';


const LoginComp  = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [signupMode, setSignupMode] = useState<boolean>(false);
  const [ForgotMode, setForgotMode] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const router = useRouter();

  // Define translated login and signup fields
  const loginFields = [
    { label: 'User Name :', type: 'text', name: 'username', placeholder: 'Enter your username' },
    { label: 'Password :', type: 'password', name: 'password', placeholder: 'Enter your password' }
  ];

  const signupFields = [
    { label: 'Email :', type: 'email', name: 'email', placeholder: 'Enter your email' },
    { label: 'User Name :', type: 'text', name: 'username', placeholder: 'Enter your username' },
    { label: 'Password :', type: 'password', name: 'password', placeholder: 'Enter your password' }
  ];

  const forgotPasswordFields = [
    { label: 'Email :', type: 'email', name: 'email', placeholder: 'Enter your email' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000); // Clear the message after 5 seconds
  
    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the message changes
  }, [message]); 

  useEffect(() => {
    setLoggedIn(sessionStorage.getItem('isLoggedIn') === 'true');
    if (loggedIn) {
      router.push('/login');
    }
  }, [loggedIn, router]);

  const handleLogin = async (formData: { username: string; password: string }) => {
    try {
      const response = await login(formData.username, formData.password);
      console.log('Logged in successfully');
      setLoggedIn(true);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store authentication state in session storage
      sessionStorage.setItem('csrfToken', response.csrfToken); // Store CSRF token
      router.push('/home');
    } catch (error) {
      console.error('Error:', error); // הדפסת השגיאה לקונסול
      setMessage('User Name or password incorrect');
    }
  };

  const handleSignup = async (formData: { email: string; username: string; password: string }) => {
    try {
      await signup(formData.email, formData.username, formData.password);
      setMessage('User Created!');
      setSignupMode(!signupMode);
    } catch (error) {
      console.error('Error:', error); // הדפסת השגיאה לקונסול
      setMessage('User not created');
    }
  };

  const handleForgotPassword = async (formData: { email: string }) => {
    try {
      await forgot_pass(formData.email);
      alert('A link will be sent to the email to reset the password');
      setForgotMode(false); // After submitting, revert to the login form
    } catch (error) {
      console.error('Error:', error); // הדפסת השגיאה לקונסול
      setMessage('Failed to process the request');
      setForgotMode(!ForgotMode);
    }
  };

  const navigateLogin = () => {
    setSignupMode(false);
    setForgotMode(!ForgotMode);
  };

  return (
    <div className="sidebar">
      <div className="logo-lang-container">
        <div onClick={navigateLogin} className="logo-container">
        <Image src={Logo} alt="Logo" className="logo" />
        </div>
      </div>
      {!ForgotMode ? (
        <div>
          <Form
            onSubmit={signupMode ? handleSignup : handleLogin}
            message={message}
            fields={signupMode ? signupFields : loginFields}
            buttonText={signupMode ? 'signup' : 'login'}
            actionText={signupMode ? 'Create your account' :'Log in to your account'}
            onActionClick={() => {
              setMessage('');
              setSignupMode(!signupMode);
            }}
            onForgotClick={() => {
              setMessage('');
              setForgotMode(true);
            }}
          />
        </div>
      ) : (
        <div>
          <div>
            <ButtonLink onClick={navigateLogin}>{'<- back'}</ButtonLink>
            <br />
            <br />
          </div>
          <Form
            onSubmit={handleForgotPassword}
            message={message}
            fields={forgotPasswordFields}
            buttonText={'Reset Email'}
            actionText={'Forgot Password?'}
            onActionClick={() => setForgotMode(false)}
            onForgotClick={() => setForgotMode(false)}
          />
        </div>
      )}
    </div>
  );
};

export default LoginComp;
