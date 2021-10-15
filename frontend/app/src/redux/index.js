import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import { user } from './auth/reducer';
import { messages } from './message/reducer';

export default combineReducers({
    form: reduxFormReducer,
    user,
    messages,
});

