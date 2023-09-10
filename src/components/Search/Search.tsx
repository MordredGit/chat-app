import { alpha, styled, Theme } from "@mui/material/styles";

const Search = styled("div")(({ theme }: { theme: Theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.default, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;
