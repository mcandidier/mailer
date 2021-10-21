/* eslint-disable array-callback-return */
import React from 'react';
import { Container } from '@mui/material';
import { connect } from 'react-redux';
import { Message, MessageForm  } from '.';


import { getUserInbox } from '../redux/message/actions';


const Inbox = (props) => {
    const { messages } = props;
    

    const renderMessages = () => {
        return messages.map( (msg, i) => {
            return <Message key={i} message={msg}></Message>
        })
    }

    return (
        <Container component="main" maxWidth="xs">

        <div className="app__inbox">
            {/* {
            messages.data.map( (msg, i) => {
                return <li key={i}>{msg.message}</li>
            })
            } */}
            {renderMessages()}
            <div>
                <MessageForm></MessageForm>
            </div>
        </div>
        </Container>
    )
}


const mapStateToProps = (state, ownProps) => {
    const {messages} = state;
    return {
        messages
    }
}
const mapDispatchToProps = dispatch => {
    dispatch(getUserInbox());
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox);