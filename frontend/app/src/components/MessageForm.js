import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit } from 'redux-form';
import * as Form from '../common/Fields';

import Button from '@mui/material/Button';

import { handleSendMessage } from '../redux/message/actions';



function ReplyForm(props) {
    const {handleSubmit, handleSendMessage, message } = props;
    const recipient = message.recipient.toString();

    const onSubmit = (values) => {
        let data = values;
    
        data['parent'] = message.id;
        data['recipients'] = recipient.split(',').map(Number);
        handleSendMessage(data);
    }

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="title"
                    label="title"
                    type="text"
                />
                <Field
                    component={Form.renderTextField}
                    validate={[Form.required]}
                    name="message"
                    label="message"
                    type="text"
                />
                <Button type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}

ReplyForm = connect(null, {handleSendMessage})(ReplyForm);

export default reduxForm({
    form: 'replyForm',
})(ReplyForm);