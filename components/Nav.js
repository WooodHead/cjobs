import Link from "next/link";
import { AppBar, Grid, Paper, Container, Toolbar } from "@material-ui/core";
import classes from "../styles/Nav.module.css";

const navigationLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/aboutus" },
];

const Nav = () => {
  return (
    <Grid className={classes.nav}>
      <Toolbar disableGutters>
        {navigationLinks.map((item) => {
          return (
            <Link
              key={item.name}
              style={{ textDecoration: "none" }}
              className={classes.link}
              href={item.href}
            >
              {item.name}
            </Link>
          );
        })}
      </Toolbar>
    </Grid>
  );
};

export default Nav;
