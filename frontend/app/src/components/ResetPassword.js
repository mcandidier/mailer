import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { handleResetPasswordTokenVerification } from '../redux/auth/actions';

function ResetPassword({handleResetPasswordTokenVerification, location}) {
    const urlValues = queryString.parse(location.search);
    const {token, uid} = urlValues;

    const [isTokenValid, setIsTokenValid] = useState(false)

    useEffect(() => {
        handleResetPasswordTokenVerification(uid, token).then(resp => {
            setIsTokenValid(true);
        }, (err) => {
            setIsTokenValid(false)
        });
    }, []);
    return (
        <div>
            Reset your password
            {isTokenValid && 
                <form onSubmit=''>
                    <input type="text" placeholder="new password" />
                    <input type="text" placeholder="confirm password" />
                    <button type="submit">Save</button>
                </form>
            }
        </div>
    )
}

export default connect(null, {handleResetPasswordTokenVerification})(ResetPassword);