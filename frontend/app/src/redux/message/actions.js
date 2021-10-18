import API from '../../api';


export const getUserInbox = (data) => {
    return async (dispatch) => {
         const response = await API.get('messages/inbox/');
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
