import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { Button } from '@mui/material';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { renderTextField, required } from '../common/Fields';

import { handleResetPasswordTokenVerification, handleResetChangePassword} from '../redux/auth/actions';

function ResetPassword(props) {

    const { handleResetPasswordTokenVerification, handleResetChangePassword, location, handleSubmit } = props;

    const urlValues = queryString.parse(location.search);
    const {token, uid} = urlValues;

    console.log(token, uid)

    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        handleResetPasswordTokenVerification(uid, token).then(resp => {
            setIsTokenValid(true);
        }, (err) => {
            setIsTokenValid(false)
        });
    }, []);

    const remoteError = (msg) => {
        throw new SubmissionError({
          confirm_password: `${msg}`
        });
      }


    const submit = (values) => {
        console.log('on submit', values);
        console.log(uid, token);
        return handleResetChangePassword(values, uid, token, remoteError);
    }

    return (
        <div>
            Change password
            { isTokenValid && 
                <form onSubmit={handleSubmit(submit)} noValidate sx={{ mt: 1 }}>
                    <Field
                    name="password"
                    component={renderTextField}
                    label="password"
                    type="password"
                    validate={[required]}
                    margin="normal"
                    />
        
                    <Field
                    name="confirm_password"
                    component={renderTextField}
                    label="confirm password"
                    type="password"
                    validate={[required]}
                    margin="normal"
                    />
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Save
                    </Button>
                </form>
            }
        </div>
    )
}

const ResetForm =  connect(null, {
    handleResetPasswordTokenVerification,
    handleResetChangePassword})(ResetPassword);

export default reduxForm({
    form: 'resetForm'
})(ResetForm);