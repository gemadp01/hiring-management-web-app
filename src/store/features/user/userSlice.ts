import { createSlice } from "@reduxjs/toolkit";

export type TUser = {
  id: string;
  email: string;
  role: string;
  token_expires: number;
};

const INITIAL_STATE = {
  id: "",
  email: "",
  role: "",
  token_expires: 0,
} as TUser;

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    userLogin(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.token_expires = action.payload.token_expires;
    },
    userLogout(state) {
      state.id = INITIAL_STATE.id;
      state.email = INITIAL_STATE.email;
      state.role = INITIAL_STATE.role;
      state.token_expires = INITIAL_STATE.token_expires;
    },
  },
});

export const { userLogin, userLogout } = userSlice.actions;
export default userSlice;
