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
import {connect, useDispatch} from 'react-redux';
import { Message } from '../components';
import Container from '@mui/material/Container';
import MessageToolbar from './Toolbar';
import Box from '@mui/material/Box';


function MessageList(props) {
  const { messages } = props;

  const [selected, setSelected] = React.useState([]);
  const [activeMessage, setActiveMessage ] =  React.useState({});
  const [active, setActive] = React.useState(false)
  const isAllSelected = messages.length > 0 && selected.length === messages.length;

  const handleToggle = (value) => () => {
    const currentIndex = selected.indexOf(value);
    const newChecked = [...selected];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setSelected(newChecked);
  };

  const handleClick = (msg) => {
    setActive(true);
    setActiveMessage(msg);
  }

  const handleBack = () => {
    setActive(false);
    setActiveMessage({});
  }

  const handleSelectAll = (event) => {
    const value = event.target.value;
    const allMessages = [];
    
    messages.map((m, index) => {
      return allMessages.push(index);
    });
    
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === messages.length ? [] : allMessages );
      return;
    }
    setSelected(allMessages);
  };


  const renderMessageList = () => {
    return <>
      <Checkbox
        edge="start"
        tabIndex={-1}
        inputProps={{ 'aria-labelledby': 'select-all' }}
        checked={isAllSelected}
        indeterminate={
            selected.length > 0 && selected.length < messages.length
          }
        onClick={handleSelectAll}
        value="all"
      />

      <List sx={{ width: '100%', maxWidth: 'xl', bgcolor: 'background.paper' }}>
      {messages.map((msg, index) => {
        return (
          <ListItem
            key={index}
            divider={true}
            disablePadding
          >
            <ListItemButton disableRipple dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={selected.indexOf(index) > -1}
                  onClick={handleToggle(index)}
                />
              </ListItemIcon>
              <ListItemText
              sx={{ maxWidth: '10%' }}>{msg.receiver}</ListItemText>
              <ListItemText
              onClick={ () => handleClick(msg) }
              primary={msg.title}
              />
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
  </> 
  }


  return (
    <React.Fragment>      
    <MessageToolbar handleBack={handleBack} selected={active}/>
    { !active ?
      renderMessageList()
    :
    <Message msgId={activeMessage.id}></Message>
    } 
    </React.Fragment>
  );
}


const mapStateToProps = (state, ownProps) => {
  const messages = state.messages.data;
  return {
      messages
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps)
  dispatch(getUserInbox('inbox'));
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);