import React from "react";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StyledBadge from "./StyledBadge";
import { ChatList } from "../data";

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
            <Typography variant="caption">
              {msg.length > 20 ? msg.slice(0, 20) + "..." : msg}
            </Typography>
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

export default ChatElement;
