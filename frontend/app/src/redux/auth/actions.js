import API from '../../api';

export const handleSignUp = (data, successCallback, errorCallback) => {
    return (dispatch) => {
        return API.post('accounts/register/', data).then(resp => {
            const {data} = resp;
            dispatch({type: 'REGISTER', payload: data});
            successCallback();
        }, err => {
            errorCallback(err.response.data);
        });
    }
}

export const handleLogin = (data, errorCallback) => {
    return (dispatch) => {
        return API.post('accounts/login/', data).then(resp => {
                const {data} = resp;
                dispatch({type: 'LOGIN', payload: data});
            }, err => {
                errorCallback(err);
            });
    }
}

export const handleLogout = () => {
    return (dispatch) => {
        dispatch({type: 'LOGOUT'});
    }
}

export const handleResetPassword = (data) => {
    return (dispatch) => {
        return API.post('/reset-password/', data);
    }
}

export const handleResetPasswordTokenVerification = (uidb64, token) => {
    return (dispatch) => {
        return API.get(`/reset-password/${uidb64}/${token}/`);
    }
}

export const handleResetChangePassword = (data, uidb64, token, remoteError) => {
    return (dispatch) => {
        return API.post(`/reset-password/${uidb64}/${token}/`, data).then( resp => {
            console.log(resp);
        }, (err) => {
            const { confirm_password } = err.response.data;
            remoteError(confirm_password);
        });
    }
}

export const getUserProfile = () => {
    return (dispatch) => {
        return API.get('accounts/profile/').then( resp => {
            const { data } = resp;
            dispatch({type: 'GET_PROFILE', payload: data});
        });
    }
}