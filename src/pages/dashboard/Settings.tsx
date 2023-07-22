import { faker } from "@faker-js/faker";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  Bell,
  CaretLeft,
  Image,
  Info,
  Key,
  Keyboard,
  Lock,
  Note,
  PencilCircle,
} from "phosphor-react";
import React, { ReactElement, useState } from "react";
import ShortcutsDialog from "../../sections/settings/ShortcutsDialog";

type SettingsType = {
  key: number;
  icon: ReactElement;
  title: string;
  onclick: () => void;
};

const Settings = () => {
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const handleOpenShortcuts = () => {
    setOpenShortcuts(true);
  };
  const handleCloseShortcuts = () => {
    setOpenShortcuts(false);
  };
  const settingsList: SettingsType[] = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: "Notifications",
      onclick: () => {},
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: "Privacy",
      onclick: () => {},
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: "Security",
      onclick: () => {},
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: "Theme",
      // onclick: handleOpenTheme,
      onclick: () => {},
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: "Chat Wallpaper",
      onclick: () => {},
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: "Request Account Info",
      onclick: () => {},
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      onclick: handleOpenShortcuts,
      // onclick: () => {},
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: "Help",
      onclick: () => {},
    },
  ];

  const theme = useTheme();
  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left Pane */}
        <Box
          sx={{
            overflowX: "scroll",
            height: "100vh",
            width: 320,
            bgcolor: theme.palette.background.paper,
            boxShadow: "0 0 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction={"row"} alignItems={"center"} spacing={3}>
              <IconButton>
                <CaretLeft size={24} />
              </IconButton>
              <Typography variant="h6">Settings</Typography>
            </Stack>
            {/* Profile */}
            <Stack direction={"row"} spacing={3}>
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.firstName()}
                sx={{ height: 64, width: 64 }}
              />
              <Stack spacing={0.5}>
                <Typography variant="body1">
                  {faker.name.firstName()}
                </Typography>
                <Typography variant="body2">{faker.random.words()}</Typography>
              </Stack>
            </Stack>
            {/* List of options */}
            <Stack>
              {settingsList.map(({ key, icon, onclick, title }) => (
                <>
                  <Divider />
                  <Button
                    sx={{ p: 3, color: "inherit" }}
                    onClick={onclick}
                    key={key}
                  >
                    <Stack
                      sx={{ width: "100%" }}
                      direction={"row"}
                      alignItems={"center"}
                      spacing={2}
                    >
                      {icon}
                      <Typography variant="body2">{title}</Typography>
                    </Stack>
                  </Button>
                </>
              ))}
            </Stack>
          </Stack>
        </Box>
        {/* Right Pane */}
      </Stack>
      {/* TODO: Refactor this into a non dialog thing and insert it into Right Pane */}
      <ShortcutsDialog
        open={openShortcuts}
        handleClose={handleCloseShortcuts}
      />
    </>
  );
};

export default Settings;
