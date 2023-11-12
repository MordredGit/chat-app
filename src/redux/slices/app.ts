import { createSlice } from "@reduxjs/toolkit";
import { dispatch as storeDispatch } from "../store";

export type SidebarType = "CONTACT" | "STARRED" | "SHARED";

const initialState = {
  sidebar: {
    open: false,
    type: "CONTACT" as SidebarType, // can be CONTACT, STARRED, SHARED
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
    updateSidebarType(
      state,
      action: { payload: { type: SidebarType }; type: string }
    ) {
      state.sidebar.type = action.payload.type;
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
