import { createSlice } from "@reduxjs/toolkit";
import { dispatch as storeDispatch } from "../store";
import { AlertColor } from "@mui/material";

export type SidebarType = "CONTACT" | "STARRED" | "SHARED";
// export type AlertColor = "info" | "error" | "debug";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT" as SidebarType, // can be CONTACT, STARRED, SHARED
  },
  snackbar: {
    open: false,
    severity: "info" as AlertColor,
    message: "",
  },
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    // Toggle Sidebar
    toggleSidebar(state) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateSidebarType(state, action: { payload: { type: SidebarType } }) {
      state.sidebar.type = action.payload.type;
    },
    openSnackbar(
      state,
      action: { payload: { severity: AlertColor; message: string } }
    ) {
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
      state.snackbar.message = "";
    },
  },
});

export default slice.reducer;

export function ToggleSidebar() {
  return async (dispatch: typeof storeDispatch, getState: any) =>
    dispatch(slice.actions.toggleSidebar());
}

export function UpdateSidebarType(type: SidebarType) {
  return async (dispatch: typeof storeDispatch, getState: any) =>
    dispatch(slice.actions.updateSidebarType({ type }));
}

export function ShowSnackbar({
  severity,
  message,
}: {
  severity: AlertColor;
  message: string;
}) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    dispatch(slice.actions.openSnackbar({ severity, message }));
    // setTimeout(() => dispatch(slice.actions.closeSnackbar()), 3000);
  };
}

export function HideSnackbar() {
  return async (dispatch: typeof storeDispatch, getState: any) =>
    dispatch(slice.actions.closeSnackbar());
}
