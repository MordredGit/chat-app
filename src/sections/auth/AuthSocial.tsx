import { GithubLogo, GoogleLogo, TwitterLogo } from 'phosphor-react';
import React from 'react';

import { Divider, IconButton, Stack } from '@mui/material';

const SocialAuthList = [
  {
    id: 1,
    logo: <GoogleLogo />,
    color: "#DF3E30",
  },
  {
    id: 2,
    logo: <GithubLogo />,
    color: "#000",
  },
  {
    id: 3,
    logo: <TwitterLogo />,
    color: "#1C9CEA",
  },
];

const AuthSocial = () => {
  return (
    <div>
      <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider>
      <Stack direction={"row"} justifyContent={"center"} spacing={2}>
        {SocialAuthList.map(({id, logo, color}) => (
          <IconButton key={id} sx={{ color: color }}>
            {logo}
          </IconButton>
        ))}
      </Stack>
    </div>
  );
};

export default AuthSocial;
