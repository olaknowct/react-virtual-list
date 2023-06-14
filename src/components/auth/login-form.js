import { useState, useRef } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Box, TextField, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';

const defaultFormFields = {
  email: '',
  password: '',
};

function LoginForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const { email, password } = formFields;

  const submitHandler = async (event) => {
    setLoading(true);

    event.preventDefault();

    try {
      if (!email || !password) throw new Error('Please fill the required details!');

      const result = await signIn('credentials', {
        redirect: false,
        ...formFields,
      });

      if (result.error) throw new Error(result.error);

      router.replace('/list');
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Box
      component='section'
      padding={6}
      className='bg-slate-100 w-1/3 mt-16 rounded-md flex flex-col mx-auto'
    >
      <Typography variant='h5' component='h5' align='center'>
        Login
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
          onChange={handleChange}
          helperText='Enter your password'
          name='password'
          value={password}
        />

        <LoadingButton
          size='small'
          type='submit'
          loading={loading}
          loadingIndicator='Logging in...'
          variant='outlined'
        >
          <span> Login</span>
        </LoadingButton>
        <Link href='/signup' className='text-cyan-950 text-center'>
          No account? click here and signup
        </Link>
        {error && <span className='bg-red-200 text-slate-700 pl-6 font-bold'>{error}</span>}
      </form>
    </Box>
  );
}

export default LoginForm;
