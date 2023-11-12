import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { dispatch as storeDispatch } from "../store";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(
      state,
      action: { type: string; payload: { isLoggedIn: boolean; token: string } }
    ) {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.token = action.payload.token;
    },
    signOut(state) {
      state.isLoggedIn = false;
      state.token = "";
    },
  },
});

export default slice.reducer;

export function LogInUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .post(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) =>
        dispatch(
          slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
        )
      )
      .catch((err) => console.log(err));
  };
}

export function LogOutUser() {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    dispatch(slice.actions.signOut());
  };
}

export function ForgotPassword({ email }: { email: string }) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .post(
        "/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(
        (res) => console.log(res)

        // dispatch(
        //   slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
        // )
      )
      .catch((err) => console.log(err));
  };
}

export function ResetPassword({
  resetToken,
  password,
}: {
  resetToken: string;
  password: string;
}) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .post(
        "/auth/reset-password",
        { resetToken, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then(
        (res) => console.log(res)

        // dispatch(
        //   slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
        // )
      )
      .catch((err) => console.log(err));
  };
}
