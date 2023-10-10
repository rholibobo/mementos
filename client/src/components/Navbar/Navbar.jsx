import {useState, useEffect} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';
import decode from "jwt-decode";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";
import memories from "../../Images/memories-Logo.png";

import useStyles from "./styles";

const Navbar = () => {
  const { classes } = useStyles();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logout = () => {
    dispatch({type: "LOGOUT"})

    navigate("/")

    setUser(null);
  }

  useEffect(()=> {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    } 

    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location, logout, user?.token])  //when location changes the UseEffect takes effect

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h3"
          align="center"
        >
          Memento
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="mementos"
          height="45"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              // alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant='contained' color="primary">SignIn</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
