import React from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import {
  Search,
  SearchIconWrapper,
  SearchInputBase,
} from "../../components/Search";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { ChatList } from "../../data";
import ChatElement from "../../components/ChatElement";

// TODO: Make it slide in and out from left for smaller windows
const Chats = () => {
  const theme = useTheme();
  const isLightMode = theme.palette.mode === "light";
  return (
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
          <IconButton>
            <CircleDashed />
          </IconButton>
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
  );
};

export default Chats;
