import { createSelector } from 'reselect';

const selectListReducer = (state) => {
  return state.list;
};

export const selectVirtualList = createSelector([selectListReducer], (list) => {
  return list.virtualList;
});
