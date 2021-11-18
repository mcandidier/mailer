import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit } from 'redux-form';
import * as Form from '../common/Fields';

import Button from '@mui/material/Button';

import { handleSendMessage } from '../redux/message/actions';


function MessageForm(props) {
    const {handleSubmit, handleSendMessage, toggle, reset } = props;
    
    const successCallback = (data) => {
      reset();
    }

    const onSubmit = (values) => {
        let data = values;
        // data['parent'] = message.id;
        data['recipients'] = data.recipient.split(',').map(Number);
        handleSendMessage(data, 'new', successCallback);
    }

    return (
        <div className='app__reply_form'>
            <div className="header">
                New message

                <span className="close" onClick={toggle}>
                    close
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="recipient"
                    label="To"
                    type="text"
                    variant="standard"
                    autofocus="true"
                />
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="title"
                    label="Subject"
                    type="text"
                    variant="standard"
                />
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="message"
                    label="Message"
                    type="text"
                    variant="standard"
                />
                
                <Button type="submit" variant="contained" size="small">
                    Send
                </Button>
            </form>
        </div>
    )
}

MessageForm = connect(null, {handleSendMessage})(MessageForm);

export default reduxForm({
    form: 'messageForm',
})(MessageForm);