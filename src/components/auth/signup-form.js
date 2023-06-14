import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { Box, TextField, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

async function createUser(email, password, passwordConfirm) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password, passwordConfirm }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const { error } = data;

    let errorMsg;

    // Operational errors
    switch (error) {
      case error === 'User validation failed: passwordConfirm: Passwords are not the same!':
        errorMsg = 'Passwords are not the same!';
        break;
      case error.code === 11000: // not working #bug
        errorMsg = 'Email has taken already please choose another one.';
        break;
      default:
        errorMsg = 'Something went wrong!';
    }

    if (error.code === 11000) {
      errorMsg = 'Email has taken already please choose another one.';
    }

    throw new Error(errorMsg);
  }

  return data;
}

const defaultFormFields = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);

  const { email, password, passwordConfirm } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const submitHandler = async (event) => {
    setLoading(true);

    event.preventDefault();

    try {
      if (!email || (!password && !passwordConfirm))
        throw new Error('Please fill the required details!');

      if (password !== passwordConfirm) throw new Error('Password not matched. please try again');

      const result = await createUser(email, password, passwordConfirm);

      if (result.error) throw new Error(result.error);

      setSignedUp(true);
    } catch (error) {
      setError(error.message);
    }

    resetFormFields();
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      {!signedUp ? (
        <Box
          component='section'
          padding={6}
          className='bg-slate-100 w-1/3 mt-16 rounded-md flex flex-col mx-auto'
        >
          <Typography variant='h5' component='h5' align='center'>
            Signup Here
          </Typography>
          <form onSubmit={submitHandler} className='flex flex-col mt-4 gap-4'>
            <TextField
              id='outlined-helperText'
              label='email'
              helperText='Please input a valid email'
              onChange={handleChange}
              name='email'
              value={email}
            />
            <TextField
              id='outlined-password-input'
              label='Password'
              type='password'
              helperText='Enter your password'
              onChange={handleChange}
              name='password'
              value={password}
            />

            <TextField
              id='outlined-password-input'
              label='Password Confirm'
              type='password'
              helperText='Enter your password'
              onChange={handleChange}
              name='passwordConfirm'
              value={passwordConfirm}
            />

            <LoadingButton
              size='small'
              type='submit'
              loading={loading}
              loadingIndicator='Logging in...'
              variant='outlined'
            >
              <span> Signup</span>
            </LoadingButton>
            <Link href='/login' className='text-cyan-950 text-center'>
              already have account? Click and login here!
            </Link>
            {error && (
              <span className='bg-red-100 text-red-700 p-3 font-bold text-center'>{error}</span>
            )}
          </form>
        </Box>
      ) : (
        <Alert severity='success' className='w-1/2 mx-auto mt-8 relative'>
          <Link href='/login'>Successfully signed up, click here and log in now! 😊</Link>
          <button
            className='absolute top-0 right-1 text-xl'
            onClick={() => setSignedUp((signedUp) => !signedUp)}
          >
            ✖
          </button>
        </Alert>
      )}
    </>
  );
};

export default SignupForm;
