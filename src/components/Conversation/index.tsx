import React from "react";
import { Box, Stack } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";
import Message from "./Message";

const Conversation = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
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
