import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { dispatch as storeDispatch } from "../store";
import { RootState } from "../rootReducer";

const initialState = {
  isLoggedIn: false,
  token: "",
  isLoading: false,
  email: "",
  error: "",
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLoading(
      state,
      action: { type: string; payload: { isLoading: boolean } }
    ) {
      state.isLoading = action.payload.isLoading;
    },
    updateError(state, action: { type: string; payload: { error: string } }) {
      state.error = action.payload.error;
    },
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
    updateRegisterEmail(
      state,
      action: { type: string; payload: { isLoggedIn: boolean; email: string } }
    ) {
      state.email = action.payload.email;
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

export function RegisterUser(data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}) {
  return async (dispatch: typeof storeDispatch, getState: () => RootState) => {
    dispatch(
      slice.actions.updateIsLoading({
        isLoading: true,
      })
    );
    dispatch(
      slice.actions.updateError({
        error: "",
      })
    );
    axiosInstance
      .post(
        "/auth/register",
        { ...data },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        console.log(res);

        dispatch(
          slice.actions.updateRegisterEmail({
            isLoggedIn: true,
            email: data.email,
          })
        );

        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
        dispatch(
          slice.actions.updateError({
            error: "",
          })
        );
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          slice.actions.updateIsLoading({
            isLoading: false,
          })
        );
        dispatch(
          slice.actions.updateError({
            error: err,
          })
        );
      })
      .finally(() => {
        if (!getState().auth.error) window.location.href = "/auth/verify";
      });
  };
}

export function VerifyEmail(data: { otp: string; email: string }) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .post("/auth/verify-otp", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        console.log(res);

        dispatch(
          slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
        );
      })
      .catch((err) => console.log(err));
  };
}
