import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, submit } from 'redux-form';
import * as Form from '../common/Fields';

import Button from '@mui/material/Button';

import { handleSendMessage } from '../redux/message/actions';



function MessageForm(props) {
    const {handleSubmit, handleSendMessage} = props;

    const onSubmit = (values) => {
        let data = values;
        data['recipients'] = data.recipients.split(',').map(Number);
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
                <Field
                    component={Form.renderTextField}
                    name="parent"
                    label="parent"
                    type="text"
                />
                <Field
                    component={Form.renderTextField}
                    name="recipients"
                    label="recipients"
                    type="text"
                />

                <Button type="submit">
                    Save
                </Button>
            </form>
        </div>
    )
}

MessageForm = connect(null, {handleSendMessage})(MessageForm);

export default reduxForm({
    form: 'messageForm',
})(MessageForm);