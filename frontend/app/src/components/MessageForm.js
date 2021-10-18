import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit } from 'redux-form';
import * as Form from '../common/Fields';

import Button from '@mui/material/Button';

import { handleSendMessage } from '../redux/message/actions';



function ReplyForm(props) {
    const {handleSubmit, handleSendMessage, message, toggle, reset, addNew } = props;
    const recipient = message.recipient.toString();
    
    console.log(recipient, 'recipient')

    const successCallback = (data) => {
        reset();
        addNew(data);
    }

    const onSubmit = (values) => {
        let data = values;
        data['parent'] = message.id;

        data['recipients'] = [message.sender];

        // data['recipients'] = recipient.split(',').map(Number);
        handleSendMessage(data, '', successCallback);
    }



    return (
        <div className='app__reply_form'>
            <div className="header">
                Reply to { message.title }

                <span className="close" onClick={toggle}>
                    close
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="title"
                    label="title"
                    type="text"
                    variant="standard"
                />
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="message"
                    label="message"
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

ReplyForm = connect(null, {handleSendMessage})(ReplyForm);

export default reduxForm({
    form: 'replyForm',
})(ReplyForm);