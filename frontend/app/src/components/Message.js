import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { 
    Grid, Card, CardHeader, Avatar, 
    Typography, IconButton, Divider } from '@mui/material';


import { makeStyles } from '@mui/styles';
import ReplyIcon from '@mui/icons-material/Reply';

import { getMessageDetail, getMessageReplies } from '../redux/message/actions';
import { ReplyForm } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'None',
        borderWidth: 'None',
    },
}));

const Message = (props) => {
    const { msgId, getMessageDetail, getMessageReplies} = props;
    const classes = useStyles();
    const [replies, setReplies] = useState([]);
    const [message, setMessage] = useState({});
    const [showReplyForm, setShowReplyForm] = useState(false);

     useEffect( ()  => {
        async function init() {
            const data = await getMessageDetail(msgId);
            const dataReplies = await getMessageReplies(msgId);
            setReplies(dataReplies);
            setMessage(data);
        }
        init();
    }, []);

    const addNew = (data) => {
        setReplies([...replies, data]);
    }

    const toggleForm = () => {
        setShowReplyForm(!showReplyForm);
    }

    const renderReplies = () => {
        return replies.map((msg, index) => {
            return <Grid container key={index} sx={{
                backgroundColor: '#fff'
            }}>
                    <Grid item xs={6} key={index}>
                        <Card className={classes.root}>
                            <CardHeader
                                xs={{padding: 0}}
                                avatar={
                                <Avatar aria-label="">
                                    {msg.sender}
                                </Avatar>
                                }
                                title={msg.message}
                            />
                        </Card>
                </Grid>

                <Grid 
                    container
                    item xs={6}
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center">
                        <Card className={classes.root} mr={1}>
                            <Typography variant="caption" mr={1}>{msg.timestamp}</Typography>
                        </Card>
                </Grid>
                <Divider></Divider>
            </Grid>

        });
    }

    return (
        <Grid container sx={{
            backgroundColor: '#fff'
        }}>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardHeader
                        xs={{padding: 0}}
                        avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                        }
                        title={message.title}
                    />
                </Card>
            </Grid>
            <Grid 
                container
                item xs={6}
                direction="row"
                justifyContent="flex-end"
                alignItems="center">
                    <Card className={classes.root} mr={1}>
                        <Typography variant="caption" mr={1}>{message.timestamp}</Typography>
                        <IconButton aria-label="back" onClick={ () => setShowReplyForm(true) }>
                            <ReplyIcon />
                        </IconButton>
                    </Card>
            </Grid>
            <Grid container>  
                { renderReplies() }
            </Grid>
            { showReplyForm && <ReplyForm message={message} toggle={toggleForm} addNew={addNew}></ReplyForm>  }
        </Grid>

    )
}

export default connect(null, {getMessageDetail, getMessageReplies})(Message);