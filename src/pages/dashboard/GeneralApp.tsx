import React from "react";
import { Link } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import NoChat from "../../assets/Illustration/NoChat";
import Contact from "../../components/Contact";
import Conversation from "../../components/Conversation";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";
import { useSelector } from "../../redux/store";
import Chats from "./Chats";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar, chatType, roomId } = useSelector((store) => store.app);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: `calc(100vw - 420px - ${sidebar.open ? 320 : 0}px)`,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        {roomId !== null && chatType === "Individual" ? (
          <Conversation />
        ) : (
          <Stack
            spacing={2}
            sx={{ height: "100%", width: "100%" }}
            alignItems="center"
            justifyContent={"center"}
          >
            <NoChat />
            <Typography variant="subtitle2">
              Select a conversation or start a{" "}
              <Link
                style={{
                  color: theme.palette.primary.main,
                  textDecoration: "none",
                }}
                to="/"
              >
                new one
              </Link>
            </Typography>
          </Stack>
        )}
      </Box>
      {/* Contact */}
      {sidebar.open &&
        (() => {
          // TODO: Optimise to an enum possibly
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
