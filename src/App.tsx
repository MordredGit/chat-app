import * as React from 'react';

import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import ThemeSettings from './components/settings';
import { HideSnackbar } from './redux/slices/app';
import { useDispatch, useSelector } from './redux/store';
import Router from './routes';
import ThemeProvider from './theme';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {
  const dispatch = useDispatch();
  const snackbar = useSelector((state) => state.app.snackbar);

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>
      {snackbar && snackbar.message && snackbar.open && (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackbar.open}
          autoHideDuration={3000}
          key={1}
          onClose={() => {
            dispatch(HideSnackbar());
          }}
        >
          <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;
