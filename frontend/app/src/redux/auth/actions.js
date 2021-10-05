import API from '../../api';

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
        return API.post('accounts/reset-password/', data);
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