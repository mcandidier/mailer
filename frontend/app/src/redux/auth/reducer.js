const token = localStorage.getItem('access-token', null);

const INITIAL_STATE = {
    loggedIn: token ? true: false,
    user: {}
}

export function user(state=INITIAL_STATE, action) {
    switch(action.type) {
        case 'LOGIN':
            console.log(action, 'action');
            localStorage.setItem('access-token', action.payload.token);
            return {
                loggedIn: true,
                user: action.payload
            };
        case 'LOGOUT':
            localStorage.removeItem('access-token');
            return {}
        default:
            return state;
    }
}