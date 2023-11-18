import { ArrowDownLeft, ArrowUpRight, Phone } from 'phosphor-react';
import React from 'react';

import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CallList } from '../data';
import StyledBadge from './StyledBadge';

type CallType = (typeof CallList)[0];

const CallLogElement = ({
  img,
  name,
  online,
  incoming,
  missed,
  time,
}: CallType) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: 75,
        borderRadius: 1,
        backgroundColor: theme.palette.background.default,
      }}
      p={2}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Stack direction={"row"} spacing={2}>
          {online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar src={img} alt="user avatar" />
            </StyledBadge>
          ) : (
            <Avatar src={img} alt="user avatar" />
          )}
          <Stack spacing={0.3}>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              {incoming ? (
                <ArrowDownLeft color={missed ? "red" : "green"} />
              ) : (
                <ArrowUpRight color={missed ? "red" : "green"} />
              )}
              <Typography variant="caption">
                {"Yesterday, "}
                <Typography variant="caption" sx={{ fontWeight: 600 }}>
                  {time}
                </Typography>
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Box alignItems={"center"}>
          <IconButton>
            <Phone size={24} color="green" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default CallLogElement;
