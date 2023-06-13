import { Box } from '@mui/material';
import React from 'react';

const Item = ({ index, style, virtualList }) => (
  <Box
    component='div'
    sx={{
      ...style,
      height: 'auto',
      padding: '12px 0 12px 12px',
      backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff',
    }}
  >
    {virtualList[index]}
  </Box>
);

export default Item;
