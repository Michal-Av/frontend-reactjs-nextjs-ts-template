'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@/components/Containers/Form/Form';
import { resetPassword } from '@/services/api-auth';
import { useTranslation } from 'react-i18next';
import '@/styles/Login.css';
import LanguageSelector from '@/components/UIElements/Select/LanguageSelector';

interface ResetPasswordPageProps {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResetPassword: React.FC<ResetPasswordPageProps> = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token'); // Get the token from the URL
  const [message, setMessage] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const { t, i18n } = useTranslation();

  const passFields = [
    { label: t('Password :'), type: 'password', name: 'password', placeholder: t('') },
    { label: t('Confirm Password :'), type: 'password', name: 'newpassword', placeholder: t('') },
  ];

  useEffect(() => {
    return () => {
      setMessage(''); // Reset the message when the component unmounts
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000); // Clear the message after 5 seconds

    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when the message changes
  }, [message]);

  const handleSubmit = async (formData: { password: string; newpassword: string }) => {
    if (formData.password !== formData.newpassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      if (token) {
        await resetPassword(token, formData.newpassword);
        setResetSuccess(true);
        setMessage('Password reset successfully');
        router.push('/login'); // Navigate to login page
      } else {
        setMessage('Token is missing');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred while resetting the password');
    }
  };

  if (resetSuccess) {
    return (
      <div className="lang-con">
        <h2>Password Reset Successful</h2>
        <p>Your password has been successfully reset.</p>
      </div>
    );
  }

  return (
    <div className="lang-con">
      <LanguageSelector onLanguageChange={i18n.changeLanguage} />
      <div className="center-box">
        <Form
          onSubmit={handleSubmit}
          message={message}
          fields={passFields}
          buttonText={t('reset')}
          actionText={t('Reset Password')}
          onActionClick={() => {}}
          onForgotClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ResetPassword;
