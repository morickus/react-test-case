import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  name: string
}

type UserState = {
  item: User;
}

const initialState: UserState = {
  item: {
    name: ''
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.item.name = action.payload;
    }
  }
});

export const { setUserName } = userSlice.actions

export default userSlice.reducer