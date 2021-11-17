
const INITIAL_STATE = {
    filter: 'inbox',
    data: [],
}

export const messages = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return Object.assign({}, state, {'filter': action.payload}); 
        case 'GET_INBOX':
            return Object.assign({}, state, {'data': action.data}); 
        case 'SET_DRAFTS':
            return Object.assign({}, state, {'draft': action.data}); 
        case 'SET_SENT':
            console.log('entering sent action');
            return Object.assign({}, state, {'sent': action.payload}); 
        case 'SEND_MESSAGE':
            return { // returning a copy of orignal state 
                ...state, //copying the original state
                data: [...state.data, action.data] //new todos array 
               } 
        case 'REMOVE_MESSAGE':
            return {
                ...state,
                data: state.data.filter((item) => item !== action.payload)
              };
        default:
            return state;
    }
}