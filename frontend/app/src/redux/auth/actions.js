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