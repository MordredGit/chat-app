import { AlertColor } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../utils/axios";
import { dispatch as storeDispatch, RootReducerState } from "../store";
import { GenericReturnType } from "./auth";

export type SidebarType = "CONTACT" | "STARRED" | "SHARED";
// export type AlertColor = "info" | "error" | "debug";

type UsersReturnType = GenericReturnType & { data: User[] };
type FriendsReturnType = GenericReturnType & {
  data: { friends: User[]; _id: string };
};
type FriendRequestsReturnType = GenericReturnType & { data: FriendRequest[] };

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  online: boolean;
}
export interface FriendRequest {
  _id: string;
  sender: { _id: string; firstName: string; lastName: string; status: boolean };
  recipient: string;
  createdAt: Date;
}
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
  users: [] as User[],
  friends: [] as User[],
  requests: [] as FriendRequest[],
  chatType: null as "Individual" | "Group" | null,
  roomId: null as string | null,
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
    updateUsers(state, action: { payload: { users: User[] } }) {
      state.users = action.payload.users;
    },
    updateFriends(state, action: { payload: { friends: User[] } }) {
      state.friends = action.payload.friends;
    },
    updateRequests(state, action: { payload: { requests: FriendRequest[] } }) {
      state.requests = action.payload.requests;
    },
    selectConversation(state, action: { payload: { roomId: string } }) {
      state.chatType = "Individual";
      state.roomId = action.payload.roomId;
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
export function FetchUsers() {
  return async (
    dispatch: typeof storeDispatch,
    getState: () => RootReducerState
  ) => {
    axiosInstance
      .get<UsersReturnType>("/user/get-users", {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { data: users, message, status } = res.data;

        dispatch(slice.actions.updateUsers({ users }));
        dispatch(slice.actions.openSnackbar({ severity: status, message }));
      })
      .catch((err) => console.log(err));
  };
}
export function FetchFriends() {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .get<FriendsReturnType>("/user/get-friends", {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const {
          data: { friends },
          message,
          status,
        } = res.data;

        dispatch(slice.actions.updateFriends({ friends }));
        dispatch(slice.actions.openSnackbar({ severity: status, message }));
      })
      .catch((err) => console.log(err));
  };
}

export function FetchRequests() {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    axiosInstance
      .get<FriendRequestsReturnType>("/user/get-friend-requests", {
        headers: {
          Authorization: `Bearer ${getState().auth.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const { data: requests, message, status } = res.data;

        dispatch(slice.actions.updateRequests({ requests }));
        dispatch(slice.actions.openSnackbar({ severity: status, message }));
      })
      .catch((err) => console.log(err));
  };
}

export function SelectConversation({ roomId }: { roomId: string }) {
  return async (dispatch: typeof storeDispatch, getState: any) => {
    dispatch(slice.actions.selectConversation({ roomId }));
    // setTimeout(() => dispatch(slice.actions.closeSnackbar()), 3000);
  };
}
