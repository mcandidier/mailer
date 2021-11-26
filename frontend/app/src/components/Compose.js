import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit } from 'redux-form';
import * as Form from '../common/Fields';

import Button from '@mui/material/Button';

import { handleSendMessage } from '../redux/message/actions';


function MessageForm(props) {
    // TODO: display email validation to form.
    const {handleSubmit, handleSendMessage, toggle, reset } = props;
    
    const successCallback = (data) => {
      reset();
    }

    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


    const onSubmit = (values) => {
        let data = values;
        const recipients = [];
        data.recipient.split(',').map( item => {
            if(validateEmail(item)) {
                recipients.push(item);
            }
            return item;
        })
        data['recipients'] = recipients;
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