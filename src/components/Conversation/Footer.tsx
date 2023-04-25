import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { styled, Theme, useTheme } from "@mui/material/styles";
import { LinkSimple, PaperPlaneTilt, Smiley } from "phosphor-react";
import React from "react";

const StyledInput = styled(TextField)(({ theme }: { theme: Theme }) => ({
  "& .MuiInputBase-input": {
    paddingTop: "12px",
    paddingBottom: "12px",
  },
}));

const Footer = () => {
  const theme = useTheme();

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
                <IconButton>
                  <Smiley />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
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
