import React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { connect } from 'react-redux';
import { handleLogin } from '../redux/auth/actions';
import { Link } from 'react-router-dom';

import { Field, reduxForm, SubmissionError } from 'redux-form';

import { renderTextField, required } from '../common/Fields';


function SignIn(props) {
  const { error, handleSubmit, pristine, reset, submitting, handleLogin } = props;
  const remoteError = () => {
    throw new SubmissionError({
      password: 'Unable to log in with provided credentials.'
    });
  }

  const onSubmit = (values) => {
    return handleLogin(values, remoteError);
  }

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <Field
            name="username"
            component={renderTextField}
            label="username"
            type="text"
            validate={[required]}
            margin="normal"
            />

            <Field
            name="password"
            component={renderTextField}
            label="password"
            type="password"
            validate={[required]}
            margin="normal"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to='/forgot-password/' variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register/' variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            </form>
          </Box>
        </Box>
      </Container>
  );
}

const mapDispatchToProps = dispatch => {
    return {
      handleLogin: (values, err) => dispatch(handleLogin(values, err))
    }
  }

SignIn = connect(null, mapDispatchToProps)(SignIn);

export default reduxForm({
    form: 'formLogin'
})(SignIn);
