import { InputBase } from '@mui/material';
import { styled, Theme } from '@mui/material/styles';

const SearchInputBase = styled(InputBase)(({ theme }: { theme: Theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

export default SearchInputBase;
