import Link from 'next/link';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText } from '@mui/material';

import React from 'react';
function NavBar() {
  return (
    <AppBar position='static' sx={{ backgroundColor: '#8b959e' }}>
      <Toolbar sx={{ padding: '16px' }}>
        <Link href='/' passHref>
          <Typography variant='h6'>React Virtual List</Typography>
        </Link>

        <List
          component='nav'
          aria-label='main navigation'
          sx={{ marginLeft: 'auto', display: 'flex', flexDirection: 'row' }}
        >
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
