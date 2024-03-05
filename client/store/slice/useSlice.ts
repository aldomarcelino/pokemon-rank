import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    }
  }
});

export const { setIsLoggedIn } = userSlice.actions;

export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn;

export default userSlice.reducer;
