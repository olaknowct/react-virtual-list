import Link from 'next/link';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';
import { useRouter } from 'next/router';

function NavBar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  async function logoutHandler() {
    await signOut();
    router.push('/login');
  }

  return (
    <AppBar
      position='static'
      className={!session && status != 'loading' ? 'bg-neutral-700' : 'bg-green-700'}
    >
      <Toolbar className='px-16 py-8 flex flex-row justify-between'>
        <Link href='/' passHref>
          <Typography variant='h6'>React Virtual List</Typography>
        </Link>

        <Typography variant='h6'>
          {session && 'WELCOME ' + session.user.email + '🎉🎉'}
          {!session && status != 'loading' && "Oh no, you're not logged in! Please log in! ☹😓💔👉"}
        </Typography>

        <List
          component='nav'
          aria-label='main navigation'
          sx={{ display: 'flex', flexDirection: 'row' }}
        >
          {!session && status !== 'loading' && (
            <Link href='/login' passHref>
              <ListItem>
                <ListItemText primary='Login' />
              </ListItem>
            </Link>
          )}
          {session && (
            <ListItem button onClick={logoutHandler}>
              <ListItemText primary='Logout' />
            </ListItem>
          )}

          <Link href='/home' passHref>
            <ListItem>
              <ListItemText primary='Home' />
            </ListItem>
          </Link>
          <Link href='/about' passHref>
            <ListItem>
              <ListItemText primary='About' />
            </ListItem>
          </Link>
          <Link href='/list' passHref>
            <ListItem>
              <ListItemText primary='List' />
            </ListItem>
          </Link>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
