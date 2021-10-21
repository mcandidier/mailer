import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { getUserInbox } from '../redux/message/actions';
import {connect} from 'react-redux';
import { Message } from '../components';
import Container from '@mui/material/Container';
import MessageToolbar from './Toolbar';
import Box from '@mui/material/Box';

function MessageList(props) {
  const { messages } = props;

  const [checked, setChecked] = React.useState([0]);
  const [selected, setSelected] = React.useState(false);
  const [activeMessage, setActiveMessage ] =  React.useState({});

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleClick = (msg) => {
    setSelected(true);
    setActiveMessage(msg);
  }

  const handleBack = () => {
    setSelected(false);
    setActiveMessage({});
  }

  const renderMessageList = () => {
    return <div>
      <List sx={{ width: '100%', maxWidth: 'xl', bgcolor: 'background.paper' }}>
      {messages.map((msg, index) => {
        const labelId = `checkbox-list-label-${msg.title}`;
        return (
          <ListItem
            key={index}
            divider={true}
            disablePadding
          >
            <ListItemButton role={undefined} disableRipple dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  tabIndex={-1}
                  disableRipple
                  onClick={handleToggle(index)}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
              sx={{ maxWidth: '10%' }}>{msg.sender}</ListItemText>
              <ListItemText 
              id={labelId} primary={msg.title}
              onClick={ () => handleClick(msg) } />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
    { !messages.length &&
    
      <Box 
        display="flex" 
        alignItems="center"
        justifyContent="center"
      >
        No messages
      </Box>
    }
  </div> 
  }


  return (
    <React.Fragment>      
    <MessageToolbar handleBack={handleBack}/>

    { !selected ?
      renderMessageList()
    :
    <Container maxWidth={'xl'}>
      <Message msgId={activeMessage.id}></Message>
    </Container>
    } 
    </React.Fragment>
  );
}


const mapStateToProps = (state, ownProps) => {
  const {messages} = state;
  return {
      messages
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const {filter} = ownProps;
  dispatch(getUserInbox(filter));
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);