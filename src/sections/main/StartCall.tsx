import { MagnifyingGlass } from 'phosphor-react';
import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, Stack } from '@mui/material';

import CallElement from '../../components/CallElement';
import { Search, SearchIconWrapper, SearchInputBase } from '../../components/Search';
import { Transition } from '../../components/Transition';
import { CallList } from '../../data';

const StartCall = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog
      fullWidth
      maxWidth={"xs"}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      sx={{ p: 4 }}
    >
      <DialogContent>
        <Stack spacing={2}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <SearchInputBase placeholder="Search..." />
          </Search>
          {CallList.map((call) => (
            <CallElement {...call} />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" variant="contained" onClick={handleClose}>
          Create New Group
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StartCall;
