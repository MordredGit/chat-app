import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  IconButton,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { alpha, styled, Theme, useTheme } from "@mui/material/styles";
import { ArchiveBox, CircleDashed, MagnifyingGlass } from "phosphor-react";
import React from "react";
import { SimpleBarStyle } from "../../components/Scrollbar";
import StyledBadge from "../../components/StyledBadge";
import { ChatList } from "../../data";

type ChatType = (typeof ChatList)[0];

const ChatElement = ({
  id,
  img,
  name,
  msg,
  time,
  unread,
  online,
}: ChatType) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: 75,
        borderRadius: 1,
        backgroundColor: theme.palette.background.default,
      }}
      p={2}
    >
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt="user avatar" />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt="user avatar" />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Typography variant="caption">{msg}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems={"center"}>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {time}
          </Typography>
          <Badge color="primary" badgeContent={unread} />
        </Stack>
      </Stack>
    </Box>
  );
};

const Search = styled("div")(({ theme }: { theme: Theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

const SearchIconWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SearchInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));
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
            </Stack>
            <Stack spacing={2.4}>
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
