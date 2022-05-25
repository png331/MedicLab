import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  }
}));


export default function Header(props) {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    window.location.href = "/";
  };

  function RenderUsersButton(props) {
    if(props.role === "Doctor") {
      return (
        <Button href="/users">View Patients</Button>
      )
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar className='justify-content-between'>
          <div>
            <Button href="/profile">Home</Button>
            <RenderUsersButton role={props.role} />
          </div>
          <div>
                Welcome, {props.user.first_name} {props.user.last_name}  
            <IconButton onClick={handleMenu} color="inherit" className='button'>
              <Avatar />
            </IconButton>
            <Menu id="menu-appbar" 
              anchorEl={anchorEl} 
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}