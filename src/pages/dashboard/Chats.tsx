import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  Users,
} from "phosphor-react";
import React, { useState } from "react";

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
import { ChatList } from "../../data";
import Friends from "../../sections/main/Friends";

// TODO: Make it slide in and out from left for smaller windows
const Chats = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  const [openDialog, setOpenDialog] = useState(true);

  const handleOpenDialog = () => setOpenDialog(true);
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
              <IconButton>
                <CircleDashed />
              </IconButton>
              <IconButton>
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
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((chat) => chat.pinned).map((chat) => (
                  <ChatElement key={chat.id} {...chat} />
                ))}
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {ChatList.filter((chat) => !chat.pinned).map((chat) => (
                  <ChatElement key={chat.id} {...chat} />
                ))}
              </Stack>
            </SimpleBarStyle>
          </Stack>
          <Stack></Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
