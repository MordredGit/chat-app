import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AlertColor, Stack } from "@mui/material";

import { SelectConversation, ShowSnackbar } from "../../redux/slices/app";
import {
  AddIndividualConversations,
  IndividualConversationResponseType,
  UpdateIndividualConversations,
} from "../../redux/slices/conversation";
import { useDispatch, useSelector } from "../../redux/store";
import { connectSocket, socket } from "../../socket";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const conversations = useSelector(
    (state) => state.conversation.directChat.conversations
  );
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

    socket.on(
      "new-conversation",
      (data: IndividualConversationResponseType) => {
        console.log(data);

        dispatch(AddIndividualConversations({ conversation: data }));
        dispatch(SelectConversation({ roomId: data._id }));
      }
    );
    socket.on(
      "existing-conversation",
      (data: IndividualConversationResponseType) => {
        console.log(data);

        const existingConversation = conversations.filter(
          (conversation) => conversation.id === data._id
        );
        if (existingConversation.length !== 0) {
          dispatch(UpdateIndividualConversations({ conversation: data }));
        } else {
          console.log("Shouldn't Happen!!!");
        }
      }
    );

    return () => {
      socket.off("new-friend-request");
      socket.off("request-accepted");
      socket.off("request-sent");
      socket.off("new-conversation");
    };
  }, [conversations, dispatch, isLoggedIn, userId]);
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
