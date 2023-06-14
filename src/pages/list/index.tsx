import { FixedSizeList as ListItem } from 'react-window';
import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Item from '../../components/item/item';
import { useDispatch, useSelector } from 'react-redux';
import { setVirtualList } from '../../store/list/list.action';
import { selectVirtualList } from '../../store/list/list-selector';
import { data } from '../../model/list';

export default function List() {
  const virtualList = useSelector(selectVirtualList);

  const dispatch = useDispatch();

  const itemCount = virtualList.length;

  useEffect(() => {
    dispatch(setVirtualList(data));
  }, []);

  return (
    <>
      <Typography align='center' variant='h4' sx={{ margin: '16px' }}>
        Virtual List
      </Typography>
      <Box className='flex justify-center mt-16'>
        {!itemCount ? (
          <CircularProgress color='inherit' />
        ) : (
          <ListItem height={400} width={300} itemCount={itemCount} itemSize={50}>
            {({ index, style }) => <Item index={index} style={style} virtualList={virtualList} />}
          </ListItem>
        )}
      </Box>
    </>
  );
}
