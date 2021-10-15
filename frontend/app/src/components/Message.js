import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import { 
    Grid, Card, CardHeader, Avatar, 
    Typography, IconButton } from '@mui/material';


import { makeStyles } from '@mui/styles';
import ReplyIcon from '@mui/icons-material/Reply';

import { getMessageDetail } from '../redux/message/actions';
import { ReplyForm } from '../components';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'None',
        borderWidth: 'None',
    },
}));

const Message = (props) => {
    const { message, getMessageDetail} = props;
    const classes = useStyles();
    const [replies, setReplies] = useState([]);

     useEffect( ()  => {
        const {id} = message;
        async function init() {
            const data = await getMessageDetail(id);
            setReplies(data);
        }
        init();
    }, [])


    console.log(replies, 'replies');
    const handleReply = () => {

    }

    const renderReplies = () => {
        return replies.map((msg, index) => {
            return <Grid container key={index}>
                    <Grid item xs={6} key={index}>
                    <Card sx={{ maxWidth: 345 }} className={classes.root}>
                        <CardHeader
                            xs={{padding: 0}}
                            avatar={
                            <Avatar aria-label="recipe">
                                R
                            </Avatar>
                            }
                            title={msg.title}
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
            </Grid>

        });
    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Card sx={{ maxWidth: 345 }} className={classes.root}>
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
                        <IconButton aria-label="back" onClick={ () => handleReply() }>
                            <ReplyIcon />
                        </IconButton>
                    </Card>
            </Grid>
            <Grid container>  
                { renderReplies() }
            </Grid>
            <ReplyForm message={message}></ReplyForm> 
        </Grid>

    )
}

export default connect(null, {getMessageDetail})(Message);