import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AlertColor, Stack } from "@mui/material";

import { ShowSnackbar } from "../../redux/slices/app";
import { useDispatch, useSelector } from "../../redux/store";
import { connectSocket, socket } from "../../socket";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  // const userId = window.localStorage.getItem("userId")!;
  useEffect(() => {
    if (!isLoggedIn) return;
    window.onload = function () {
      if (!window.location.hash) return;
      (window as Window).location = window.location + "#loaded";
      window.location.reload();
    };

    if (!socket) connectSocket(userId);

    socket.on(
      "new-friend-request",
      (data: { status: AlertColor; message: string }) => {
        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      }
    );
    socket.on(
      "request-accepted",
      (data: { status: AlertColor; message: string }) => {
        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      }
    );
    socket.on(
      "request-sent",
      (data: { status: AlertColor; message: string }) => {
        dispatch(
          ShowSnackbar({ severity: data.status, message: data.message })
        );
      }
    );

    return () => {
      socket.off("new-friend-request");
      socket.off("request-accepted");
      socket.off("request-sent");
    };
  }, [isLoggedIn, socket, userId]);
  if (!isLoggedIn) return <Navigate to={"/auth/login"} />;

  return (
    <Stack direction={"row"}>
      {/* Sidebar */}
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
