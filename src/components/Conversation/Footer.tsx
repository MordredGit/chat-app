import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { styled, Theme, useTheme } from "@mui/material/styles";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import React, { useState } from "react";

const StyledInput = styled(TextField)(({ theme }: { theme: Theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const ChatInput = ({
  setOpenPicker,
}: {
  setOpenPicker: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <StyledInput
    fullWidth
    variant="filled"
    placeholder="Write a message..."
    InputProps={{
      disableUnderline: true,
      startAdornment: (
        <InputAdornment position="start">
          <IconButton>
            <LinkSimple />
          </IconButton>
        </InputAdornment>
      ),
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => setOpenPicker((prevValue) => !prevValue)}>
            <Smiley />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPicker] = useState(false);

  return (
    <Box
      p={2}
      sx={{
        width: "100%",
        bgcolor: theme.palette.background.paper, // "#F8FAFF",
        boxShadow: "0 0 2 rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={3}>
        <Stack sx={{ width: "100%" }}>
          <Box
            sx={{
              display: openPicker ? "inline" : "none",
              zIndex: 2,
              position: "fixed",
              bottom: 81,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={console.log}
            />
          </Box>
          <ChatInput setOpenPicker={setOpenPicker} />
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 48,
            bgcolor: theme.palette.primary.main,
            borderRadius: 1.5,
          }}
        >
          <Stack
            sx={{ height: "100%", width: "100%" }}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <IconButton>
              <PaperPlaneTilt color="white" />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
