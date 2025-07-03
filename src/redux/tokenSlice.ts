import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Profile {
  name: string;
  password: string;
  email: string;
  age?: string;
  gender?: string;
}

interface AuthState {
  token: string | null;
  profile: Profile;
}

const initialState: AuthState = {
  token: null,
  profile: {
    name: "",
    password: "",
    email: "",
  },
};

const tokenSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
      state.profile = initialState.profile;
    },
    createProfile: (state, action: PayloadAction<Profile>) => {
      state.profile = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Partial<Profile>>) => {
      state.profile = { ...state.profile, ...action.payload };
    },
  },
});

export const { setToken, removeToken, createProfile, updateProfile } =
  tokenSlice.actions;
export default tokenSlice.reducer;
