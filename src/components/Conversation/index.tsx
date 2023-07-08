import React from "react";
import { Box, Stack } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";
import Message from "./Message";

const Conversation = () => {
  return (
    <Stack
      sx={{ boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)" }}
      height={"100%"}
      maxHeight={"100vh"}
      width={"auto"}
    >
      <Header />

      <Box
        sx={{ flexGrow: 1, width: "100%", height: "100%", overflowY: "scroll" }}
      >
        <Message />
      </Box>

      <Footer />
    </Stack>
  );
};

export default Conversation;
