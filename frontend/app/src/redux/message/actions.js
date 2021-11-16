import API from '../../api';


export const getUserMessages = (filter) => {
    return async (dispatch) => {
         const response = await API.get(`messages/inbox/?filter=${filter}`);
         const { data } = response;
         dispatch({'type': 'GET_INBOX', data })
    }
}

export const handleSendMessage = (data, type='', successCallback) => {
    return (dispatch) => {
        return API.post('messages/', data).then( resp => {
            const { data } = resp;
            if(type === 'new') {
                dispatch({'type': 'SEND_MESSAGE', data });
                successCallback();
            } else {
                successCallback(data);
            }
        });

    }
}

export const getMessageDetail = messageID => {
    return async (dispatch) => {
        const response = await API.get(`messages/${messageID}/`);
        return response.data;
    }
}

export const getMessageReplies = messageID => {
    return async (dispatch) => {
        const response = await API.get(`messages/${messageID}/replies/`);
        return response.data;
    }
}


export const getTrashMessages = () => {
    return async (dispatch) => {
        const response = await API.get(`messages/trash/`);
        return response.data;
    }
}


export const setFilter = (filter) => {
    return async (dispatch) => {
        dispatch({'type': 'SET_FILTER', payload: filter});
    }
}

