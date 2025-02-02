// FormComponent
import React from 'react';
import { TextField, Button, Box, Link } from '@mui/material';

interface FormComponentProps {
  signupMode: boolean;
  forgotMode: boolean;
  handleLogin: (data: { username: string; password: string }) => void;
  handleSignup: (data: { email: string; username: string; password: string }) => void;
  handleForgotPassword: (data: { email: string }) => void;
  setSignupMode: React.Dispatch<React.SetStateAction<boolean>>;
  setForgotMode: React.Dispatch<React.SetStateAction<boolean>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const FormComponent: React.FC<FormComponentProps> = ({
  signupMode,
  forgotMode,
  handleLogin,
  handleSignup,
  handleForgotPassword,
  setSignupMode,
  setForgotMode,
  setMessage
}) => {
  const renderFields = (fields: { label: string; name: string; type: string }[]) => (
    <Box display="flex" flexDirection="column" gap={2}>
      {fields.map((field) => (
        <TextField
          key={field.name}
          label={field.label}
          type={field.type}
          name={field.name}
          variant="outlined"
          fullWidth
          sx={{ bgcolor: 'white', borderRadius: 1 }}
        />
      ))}
    </Box>
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    if (signupMode) {
      setForgotMode(false); // Reset forgot mode when switching to signup
      handleSignup(data as { email: string; username: string; password: string });
    } else if (forgotMode) {
      setSignupMode(false); // Reset signup mode when switching to forgot
      handleForgotPassword(data as { email: string });
    } else {
      handleLogin(data as { username: string; password: string });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderFields(
        signupMode
          ? [
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'User Name', name: 'username', type: 'text' },
              { label: 'Password', name: 'password', type: 'password' },
            ]
          : forgotMode
          ? [{ label: 'Email', name: 'email', type: 'email' }]
          : [
              { label: 'User Name', name: 'username', type: 'text' },
              { label: 'Password', name: 'password', type: 'password' },
            ]
      )}

      <Box mt={2}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            bgcolor: 'primary.main',
            '&:hover': { bgcolor: 'primary.dark' },
            borderRadius: 3,
          }}
        >
          {signupMode ? 'Sign Up' : forgotMode ? 'Reset Password' : 'Login'}
        </Button>
      </Box>

      <Box mt={2} display="flex" justifyContent="space-between">
        {!forgotMode && (
          <>
          <Link
            component="button"
             type="button"
            onClick={() => {
              setSignupMode(!signupMode);
              setMessage(''); 
              setForgotMode(false); 
            }}
            variant="body2"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {signupMode ? 'Already have an account? Login' : 'Create an account'}
          </Link>

          <Link
            component="button"
             type="button"
            onClick={() => {
              setForgotMode(true);
              setMessage(''); 
              setSignupMode(false);
            }}
            variant="body2"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            Forgot Password?
          </Link>
          </>
        )}
        {forgotMode && (
          <Link
           type="button"
            component="button"
            onClick={() => {setForgotMode(false); setMessage('');}}
            variant="body2"
            sx={{ textDecoration: 'none', color: 'primary.main' }}
          >
            {'< Back to Login'}
          </Link>
        )}
      </Box>
    </form>
  );
};

export default FormComponent;
