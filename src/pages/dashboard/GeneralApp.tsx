import React from 'react';

import { Box, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import Contact from '../../components/Contact';
import Conversation from '../../components/Conversation';
import SharedMessages from '../../components/SharedMessages';
import StarredMessages from '../../components/StarredMessages';
import { useSelector } from '../../redux/store';
import Chats from './Chats';

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((store) => store.app);
  return (
    <Stack direction={"row"} sx={{ width: "100%" }}>
      <Chats />
      <Box
        sx={{
          height: "100%",
          width: `calc(100vw - 420px - ${sidebar.open ? 320 : 0}px)`,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#F0F4FA"
              : theme.palette.background.paper,
        }}
      >
        <Conversation />
      </Box>
      {/* Contact */}
      {sidebar.open &&
        (() => {
          // TODO: Optimise to an enum possibly
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact />;
            case "STARRED":
              return <StarredMessages />;
            case "SHARED":
              return <SharedMessages />;
            default:
              break;
          }
        })()}
    </Stack>
  );
};

export default GeneralApp;
