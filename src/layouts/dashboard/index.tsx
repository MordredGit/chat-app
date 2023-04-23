import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Divider,
  Fade,
  IconButton,
  Stack,
  Switch,
} from "@mui/material";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(20px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(20px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

const DashboardLayout = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();
  // const isLightMode = theme.palette.mode === "light";

  return (
    <Stack direction={"row"}>
      <Box
        p={2}
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow: "0 0 2px rgba(0, 0, 0.25)",
          height: "100vh",
          width: "100px",
        }}
      >
        <Stack
          direction="column"
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ height: "100%" }}
          spacing={3}
        >
          <Stack alignItems={"center"} spacing={4}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: "64px",
                width: "64px",
                borderRadius: 1.5,
              }}
            >
              <img src={Logo} alt="logo" />
            </Box>
            <Stack
              direction="column"
              alignItems={"center"}
              sx={{ width: "max-content" }}
              spacing={3}
            >
              {Nav_Buttons.map((button) =>
                button.index === selected ? (
                  <Fade in timeout={500} key={button.index}>
                    <Box
                      p={1}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 1.5,
                      }}
                    >
                      <IconButton sx={{ width: "max-content", color: "white" }}>
                        {button.icon}
                      </IconButton>
                    </Box>
                  </Fade>
                ) : (
                  <IconButton
                    sx={{ width: "max-content" }}
                    key={button.index}
                    onClick={() => setSelected(button.index)}
                  >
                    {button.icon}
                  </IconButton>
                )
              )}
              <Divider sx={{ width: "48px" }} />
              <IconButton>
                <Gear />
              </IconButton>
            </Stack>
          </Stack>
          <Stack p={2} alignItems="center" spacing={4}>
            <AntSwitch onChange={() => onToggleMode()} defaultChecked />
            <Avatar src={faker.image.avatar()} />
          </Stack>
        </Stack>
      </Box>
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
