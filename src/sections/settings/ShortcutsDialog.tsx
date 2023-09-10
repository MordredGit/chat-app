import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { KEYBOARD_SHORTCUTS } from "../../data";
import { Transition } from "../../components/Transition";

const ShortcutsDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <>
      <Dialog
        TransitionComponent={Transition}
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        keepMounted
        sx={{ p: 4 }}
      >
        <DialogTitle>Keyboard Shortcuts</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {KEYBOARD_SHORTCUTS.map(({ key, title, combination }) => (
              <Grid item xs={6} key={key}>
                <Stack
                  sx={{ width: "100%" }}
                  justifyContent={"space-between"}
                  spacing={3}
                  direction={"row"}
                  alignItems={"center"}
                >
                  <Typography variant="caption" sx={{ fontSize: 14 }}>
                    {title}
                  </Typography>
                  <Stack spacing={2} direction={"row"}>
                    {combination.map((keyPress, idx) => (
                      <Button
                        key={idx}
                        disabled
                        variant="contained"
                        sx={{ color: "#212121" }}
                      >
                        {keyPress}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShortcutsDialog;
