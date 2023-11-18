import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { RootReducerState, dispatch as storeDispatch } from "../store";
import { ShowSnackbar } from "./app";
import { AlertColor } from "@mui/material";

type ReturnType = {
  status: AlertColor;
  message: string;
  token?: string;
};

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
      .post<ReturnType>(
        "/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (!res.data.token) {
          return dispatch(
            ShowSnackbar({
              severity: res.data.status,
              message: "Something went wrong!",
            })
          );
        }

        dispatch(
          slice.actions.signIn({ isLoggedIn: true, token: res.data.token! })
        );
        dispatch(
          ShowSnackbar({ severity: res.data.status, message: res.data.message })
        );
      })
      .catch((err) => {
        dispatch(ShowSnackbar({ severity: "error", message: err.message }));
      });
  };
}

export function LogOutUser() {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    dispatch(slice.actions.signOut());
    dispatch(
      ShowSnackbar({ severity: "success", message: "Logged out successfully!" })
    );
  };
}

export function ForgotPassword({ email }: { email: string }) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .post<ReturnType>(
        "/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(
          ShowSnackbar({
            severity: res.data.status,
            message: res.data.message,
          })
        );
      })
      .catch((err) => {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: err.message,
          })
        );
      })
      .finally(() => {
        if (!getState().auth.error) window.location.href = "/auth/login";
      });
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
      .post<ReturnType>(
        "/auth/reset-password",
        { resetToken, password },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        dispatch(
          ShowSnackbar({ severity: res.data.status, message: res.data.message })
        );
        if (res.data.status !== "success" && res.data.token) {
          dispatch(
            slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
          );
        }
      })
      .catch((err) => {
        dispatch(ShowSnackbar({ severity: "error", message: err.message }));
      });
  };
}

export function RegisterUser(data: {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}) {
  return async (
    dispatch: typeof storeDispatch,
    getState: () => RootReducerState
  ) => {
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
      .post<ReturnType>(
        "/auth/register",
        { ...data },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
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
        dispatch(
          ShowSnackbar({
            severity: res.data.status,
            message: res.data.message,
          })
        );
      })
      .catch((err) => {
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
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: err.message,
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
      .post<ReturnType>("/auth/verify-otp", data, {
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {
        // if (!res.data.token) console.log("No token received!!");

        if (res.data.status === "success" && res.data.token) {
          dispatch(
            slice.actions.signIn({ isLoggedIn: true, token: res.data.token })
          );
        }
        dispatch(
          ShowSnackbar({
            severity: res.data.status,
            message: res.data.message,
          })
        );
      })
      .catch((err) => {
        dispatch(
          ShowSnackbar({
            severity: "error",
            message: err.message,
          })
        );
      });
  };
}
