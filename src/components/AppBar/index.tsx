import { IconButton, Toolbar, Typography, AppBar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Search, SearchIconWrapper, StyledInputBase } from "./styles";

interface AppBarComponentProps {
  toggleDrawer: () => void;
  searchInput: string;
  onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AppBarComponent = ({
  toggleDrawer,
  searchInput,
  onSearchInputChange,
}: AppBarComponentProps) => (
  <AppBar position='fixed' data-testid="app-bar">
    <Toolbar>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='open drawer'
        sx={{ mr: 2 }}
        onClick={toggleDrawer}
        data-testid="menu-button"
      >
        <MenuIcon />
      </IconButton>
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        textAlign='center'
        data-testid="app-bar-title"
      >
        Radio Browser
      </Typography>

      <Search data-testid="search-container">
        <SearchIconWrapper data-testid="search-icon-wrapper">
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder='Search…'
          inputProps={{ "aria-label": "search" }}
          value={searchInput}
          onChange={onSearchInputChange}
          data-testid="header-search-input"
        />
      </Search>
    </Toolbar>
  </AppBar>
);

export default AppBarComponent;
