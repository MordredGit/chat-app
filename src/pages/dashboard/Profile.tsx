import { CaretLeft } from 'phosphor-react';
import React, { ReactElement, useState } from 'react';

import { faker } from '@faker-js/faker';
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import ProfileForm from '../../sections/main/ProfileForm';

const Profile = () => {
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
              <Typography variant="h6">Profile</Typography>
            </Stack>
            {/* Profile */}
            <Stack
              sx={{ width: "100%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Avatar
                src={faker.image.avatar()}
                alt={faker.name.firstName()}
                sx={{ height: 128, width: 128 }}
              />
            </Stack>
            <ProfileForm />
          </Stack>
        </Box>
        {/* Right Pane */}
      </Stack>
    </>
  );
};

export default Profile;
