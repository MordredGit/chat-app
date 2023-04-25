import { Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Conversation = () => {
  const theme = useTheme();

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <Header />

      {/* Messages */}
      <Box sx={{ flexGrow: 1, width: "100%" }}></Box>

      <Footer />
    </Stack>
  );
};

export default Conversation;
