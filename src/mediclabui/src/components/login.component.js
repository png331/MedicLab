import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import swal from 'sweetalert';

const APIurl = 'http://10.5.7.57:3001';
const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    marginTop: '5em'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

async function loginUser(credentials) {
  return fetch(APIurl+'/users/sign_in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then((res) => {
    if (res.ok) {
      sessionStorage.setItem("accessToken", res.headers.get("Authorization"));
      return res.json();
    } else {
      swal("Failed", res.statusText ,"error");
    }
  })
}


export default function Signin() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response =  await loginUser({
        user: {
            email,
            password
        }
    });
    if (response.status.code === 200) {
      sessionStorage.setItem('user', JSON.stringify(response.user));
      swal("Success", response.status.message, "success", {
        buttons: false,
        timer: 2000,
      });
      window.location.href = "/profile";
    } else {
      swal("Failed", response.status.message, "error");
    }
  }

  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} md={5}  component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <h1 style={{fontSize: '36px'}}>MedicLab</h1>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email Address"
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
       </Grid>
     </Grid>
  );
}
