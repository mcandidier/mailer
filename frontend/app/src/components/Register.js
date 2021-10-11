import React from 'react';
import { connect } from 'react-redux';
import { renderTextField, required, formError } from '../common/Fields';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { handleSignUp } from '../redux/auth/actions';

import { useHistory } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        mcandidier
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Register(props) {
  const { handleSubmit, pristine, reset, submitting, handleSignUp} = props;
  const history = useHistory();
  const remoteError = (errorMsg) => {
    const msgs = formError(errorMsg);
    throw new SubmissionError(msgs);
  }

  
  const onSubmit = (values) => {
    return handleSignUp(values, (resp) => {
        alert('success');
        history.push('/');
    }, remoteError);
  };

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  autoComplete="fname"
                  name="username"
                  validate={[required]}
                  fullWidth
                  id="userName"
                  label="Username"
                  component={renderTextField}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={renderTextField}
                  validate={[required]}
                  fullWidth
                  id="user"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  validate={[required]}
                  fullWidth
                  component={renderTextField}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleSignUp: (values, done, error) => dispatch(handleSignUp(values, done, error)),
  }
}

Register = connect(null, mapDispatchToProps)(Register); 

export default reduxForm({
  form: 'registerForm'
})(Register);