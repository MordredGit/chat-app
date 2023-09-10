import { styled, Theme } from "@mui/material/styles";

const SearchIconWrapper = styled("div")(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default SearchIconWrapper;
