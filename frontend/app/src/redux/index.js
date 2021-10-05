import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';


import { user } from './auth/reducer';

export default combineReducers({
    form: reduxFormReducer,
    user,
});

