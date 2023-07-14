import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { ToggleSidebar, UpdateSidebarType } from "../redux/slices/app";
import { CaretLeft, X } from "phosphor-react";
import { useDispatch } from "../redux/store";
import Message from "./Conversation/Message";

const StarredMessages = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{ width: 320, height: "100vh" }}>
      <Stack sx={{ height: "100%" }}>
        {/* Header */}
        <Box
          sx={{
            boxShadow: "0 0 2 rgba(0,0,0,0.25)",
            width: "100%",
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Stack
            direction={"row"}
            sx={{ height: "100%", p: 2 }}
            alignItems={"center"}
            justifyContent={"space-between"}
            spacing={3}
          >
            <IconButton onClick={() => dispatch(UpdateSidebarType("CONTACT"))}>
              <CaretLeft />
            </IconButton>
            <Typography variant="subtitle2">Starred Messages</Typography>
            <IconButton onClick={() => dispatch(ToggleSidebar())}>
              <X />
            </IconButton>
          </Stack>
        </Box>

        {/* Body */}
        <Stack
          sx={{
            height: "100%",
            position: "relative",
            flexGrow: 1,
            overflowY: "scroll",
          }}
          p={3}
          spacing={3}
        >
          <Message showMenu={false} />
        </Stack>
      </Stack>
    </Box>
  );
};

export default StarredMessages;
