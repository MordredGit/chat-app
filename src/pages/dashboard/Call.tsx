import { MagnifyingGlass, Phone } from 'phosphor-react';
import React, { useState } from 'react';

import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CallLogElement from '../../components/CallLogElement';
import { SimpleBarStyle } from '../../components/Scrollbar';
import { Search, SearchIconWrapper, SearchInputBase } from '../../components/Search';
import { CallList } from '../../data';
import StartCall from '../../sections/main/StartCall';

const Call = () => {
  const theme = useTheme();
  const [openNewCallDialog, setOpenNewCallDialog] = useState(false);

  const handleOpenNewCallDialog = () => {
    setOpenNewCallDialog(true);
  };

  const handleCloseNewCallDialog = () => {
    setOpenNewCallDialog(false);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/* Left */}
        <Box
          sx={{
            height: "100vh",
            bgcolor: (theme) => theme.palette.background.paper,
            width: 320,
            boxShadow: "0 0 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack
            p={3}
            spacing={2}
            sx={{
              maxHeight: "100vh",
            }}
          >
            <Typography paddingLeft={1} variant="h5">
              Call Log
            </Typography>
            <Stack>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <SearchInputBase placeholder="Search..." />
              </Search>
            </Stack>
            <Stack spacing={1}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={1.5}
              >
                <Typography
                  variant="subtitle2"
                  component={Link}
                  sx={{ cursor: "pointer" }}
                  onClick={handleOpenNewCallDialog}
                >
                  Start New Conversation
                </Typography>
                <IconButton onClick={handleOpenNewCallDialog}>
                  <Phone
                    size={24}
                    style={{ color: theme.palette.primary.main }}
                  />
                </IconButton>
              </Stack>
              <Divider />
            </Stack>
            <Stack
              spacing={2}
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
            >
              <SimpleBarStyle timeout={500}>
                <Stack spacing={2.4}>
                  {CallList.map((chat) => (
                    <CallLogElement key={chat.id} {...chat} />
                  ))}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
      </Stack>
      {openNewCallDialog && (
        <StartCall
          open={openNewCallDialog}
          handleClose={handleCloseNewCallDialog}
        />
      )}
    </>
  );
};

export default Call;
