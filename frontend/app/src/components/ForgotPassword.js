import React, { useState } from 'react';

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

import { connect } from 'react-redux';
import { handleResetPassword } from '../redux/auth/actions';
import { Link } from 'react-router-dom';

import { Field, reduxForm, SubmissionError } from 'redux-form';

import { renderTextField, required } from '../common/Fields';

import API from '../api';


function ForgotPassword(props) {
  const { error, handleSubmit, pristine, reset, submitting, handleResetPassword } = props;
  const [submitted, setSubmitted ] = useState(false); 
  
  const remoteError = () => {
    throw new SubmissionError({
      password: 'Unable to log in with provided credentials.'
    });
  }

  const onSubmit = (values) => {
    handleResetPassword(values).then( resp => {
        reset();
        setSubmitted(true);
    });
  }

  return (
      <Container component="main" maxWidth="sm">
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
            Reset Password
          </Typography>
          <Box sx={{ width: '75%', mt: 1}}>
            { submitted ? 
            <React.Fragment>
                <h2>Check your email</h2><p>Please check your email for instruction to reset your account.</p>
            </React.Fragment>
            :
            <form onSubmit={handleSubmit(onSubmit)} noValidate md={{ mt: 1 }}>
                <Field
                    name="email"
                    component={renderTextField}
                    label="Email"
                    type="email"
                    validate={[required]}
                    margin="normal"
                />
                <Grid container>
                    <Grid item xs>
                        <Link to='/register/' variant="body2">
                        {"Register"}
                        </Link>
                    </Grid>
                    <Grid item>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 0 }}
                        >
                        Reset
                    </Button>
                    </Grid>
                </Grid>
            </form>
            } 
        </Box>
        </Box>
      </Container>
  );
}

const mapDispatchToProps = dispatch => {
    return {
        handleResetPassword: (values) => dispatch(handleResetPassword(values))
    }
}

const ForgotPasswordConnect = connect(null, mapDispatchToProps)(ForgotPassword);

export default reduxForm({
    form: 'ForgotPassword'
})(ForgotPasswordConnect);