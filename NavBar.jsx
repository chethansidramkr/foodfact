import { AppBar, Toolbar, Button, Badge } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NavBar() {
  const count = useSelector((state) => state.saved.items.length);

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button color="inherit" component={NavLink} to="/">
          Home
        </Button>

        <Button color="inherit" component={NavLink} to="/saved">
          <Badge color="secondary" badgeContent={count}>
            Saved
          </Badge>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
