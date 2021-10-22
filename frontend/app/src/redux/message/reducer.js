
const INITIAL_STATE = {
    filter: 'inbox',
    data: []
}

export const messages = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return Object.assign({}, state, {'filter': action.payload}); 
        case 'GET_INBOX':
            console.log(action)
            return Object.assign({}, state, {'data': action.data}); 
        case 'SEND_MESSAGE':
            return Object.assign({}, ...state, {'data': action.payload}); 
        default:
            return state;
    }
}