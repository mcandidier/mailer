const token = localStorage.getItem('access-token', null);

const INITIAL_STATE = {
    loggedIn: token ? true: false,
    user: {}
}

export function user(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'REGISTER':
            localStorage.setItem('access-token', action.payload.token);
            return {
                loggedIn: true,
                user: action.payload
            };
        case 'LOGIN':
            localStorage.setItem('access-token', action.payload.token);
            return {
                loggedIn: true,
                user: action.payload
            };
        case 'LOGOUT':
            localStorage.removeItem('access-token');
            return {}
        case 'GET_PROFILE':
            return {
                loggedIn: true,
                user: action.payload
            }
        default:
            return state;
    }
}