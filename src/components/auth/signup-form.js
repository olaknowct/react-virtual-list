import { useState } from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignup, signUpStart } from '@/store/user/user.reducer';
import { selectUserOperationStatus } from '../../store/user/user.selector';

const defaultFormFields = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { loading, signedUp, error } = useSelector(selectUserOperationStatus);

  const { email, password, passwordConfirm } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    dispatch(signUpStart(formFields));

    if (signedUp) resetFormFields();
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
            onClick={() => dispatch(closeSignup())}
          >
            ✖
          </button>
        </Alert>
      )}
    </>
  );
};

export default SignupForm;
