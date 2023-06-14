import { createSelector } from 'reselect';

const selectUserReducer = (state) => {
  return state.user;
};

export const selectUserOperationStatus = createSelector([selectUserReducer], (user) => {
  const { loading, signedUp, error } = user;

  return { loading, signedUp, error };
});
