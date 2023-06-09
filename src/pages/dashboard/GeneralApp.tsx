import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Conversation from "../../components/Conversation";
import Chats from "./Chats";
import Contact from "../../components/Contact";
import { useSelector } from "../../redux/store";

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
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
        <Conversation />
      </Box>
      {/* Contact */}
      {sidebar.open && <Contact />}
    </Stack>
  );
};

export default GeneralApp;
