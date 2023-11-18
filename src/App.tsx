import * as React from "react";
import Router from "./routes";
import ThemeProvider from "./theme";
import ThemeSettings from "./components/settings";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "./redux/store";
import { HideSnackbar } from "./redux/slices/app";

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
