export const messages = (state=[], action) => {
    switch(action.type) {
        case 'GET_INBOX':
            return action.data;
        case 'SEND_MESSAGE':
            return [...state, action.data]
        default:
            return state;
    }
}