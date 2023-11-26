import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ChatElement from "../../components/ChatElement";
import { SimpleBarStyle } from "../../components/Scrollbar";
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from "../../components/Search";
import {
  FetchIndividualConversations,
  IndividualConversationResponseType,
} from "../../redux/slices/conversation";
import { useDispatch, useSelector } from "../../redux/store";
import Friends, { TabLabel } from "../../sections/main/Friends";
import { socket } from "../../socket";

// TODO: Make it slide in and out from left for smaller windows
const Chats = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const conversations = useSelector(
    (state) => state.conversation.directChat.conversations
  );
  const isLightMode = theme.palette.mode === "light";
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState<TabLabel>("explore");

  useEffect(() => {
    socket.emit(
      "get-indiv-conv",
      { userId },
      (data: IndividualConversationResponseType[]) => {
        dispatch(FetchIndividualConversations({ conversations: data }));
      }
    );
  }, [dispatch, userId]);

  const handleOpenDialog = (tabValue: TabLabel) => {
    setOpenDialog(true);
    setTabValue(tabValue);
  };
  const handleCloseDialog = () => setOpenDialog(false);
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor: isLightMode
            ? "#F8FAFF"
            : theme.palette.background.paper, // "#F8FAFF",
          boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
        }}
      >
        <Stack
          p={3}
          spacing={2}
          sx={{
            height: "100vh",
          }}
        >
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography paddingLeft={1} variant="h5">
              Chats
            </Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton onClick={() => handleOpenDialog("friends")}>
                <CircleDashed />
              </IconButton>
              <IconButton onClick={() => handleOpenDialog("explore")}>
                <Users />
              </IconButton>
            </Stack>
          </Stack>
          <Stack>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <SearchInputBase placeholder="Search..." />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider />
          </Stack>
          <Stack
            spacing={2}
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500}>
              <Stack spacing={2.4}>
                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((chat) => chat.pinned).map((chat) => (
                  <ChatElement key={chat.id} {...chat} />
                ))} */}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((chat) => !chat.pinned)
                  .map((chat) => (
                    <ChatElement key={chat.id} {...chat} />
                  ))}
              </Stack>
            </SimpleBarStyle>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends
          open={openDialog}
          tabValue={tabValue}
          handleClose={handleCloseDialog}
        />
      )}
    </>
  );
};

export default Chats;
