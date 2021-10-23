
const INITIAL_STATE = {
    filter: 'inbox',
    data: []
}

export const messages = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return Object.assign({}, state, {'filter': action.payload}); 
        case 'GET_INBOX':
            return Object.assign({}, state, {'data': action.data}); 
        case 'SEND_MESSAGE':
            console.log(action)
            return { // returning a copy of orignal state 
                ...state, //copying the original state
                data: [...state.data, action.data] //new todos array 
               } 
        default:
            return state;
    }
}