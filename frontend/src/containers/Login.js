import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "./Header";
//import {Link} from "react-router-dom"
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Усі права захищені Богом © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



export class Login extends React.Component {
   state = {
   username: '',
   password: '',
 }
 onSubmit =e=> {
     e.preventDefault();
     console.log('submit');
 }
 onChange =e=>this.setState({[e.target.name]:e.target.value})


 render() {

  const {username, password}= this.state;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div >

        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <form onSubmit={this.onSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <input

                type="text"
                name="username"

                onChange={this.onChange}
                value={username}

              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.onChange}
                value={password}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Клянюсь любити аніме всім серцем."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"

            href={"/home"}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
   }
}
export default Login;