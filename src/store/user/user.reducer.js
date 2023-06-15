import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  currentUser: null,
  loading: false,
  error: null,
  signedUp: false,
};

export const userSlice = createSlice({
  name: 'users',
  initialState: INITIAL_STATE,
  reducers: {
    signUpStart(state) {
      state.loading = true;
    },
    signInSuccess(state) {
      state.loading = false;
      state.signedUp = true;
    },

    signupFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    closeSignup(state) {
      state.signedUp = false;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setError, closeSignup, signUpStart, signInSuccess, signupFailed } =
  userSlice.actions;

export const userReducer = userSlice.reducer;

// export const updateFactStart = createAction('facts/updateFactStart');
