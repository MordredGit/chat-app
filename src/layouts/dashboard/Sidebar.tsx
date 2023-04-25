import { useTheme } from "@mui/material/styles";
import { Avatar, Box, Divider, Fade, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";

import Logo from "../../assets/Images/logo.ico";
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";
import AntSwitch from "../../components/AntSwitch";

const Sidebar = () => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const { onToggleMode } = useSettings();

  return (
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
  );
};

export default Sidebar;
