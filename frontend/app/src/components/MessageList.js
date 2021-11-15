import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { getUserInbox } from '../redux/message/actions';
import {connect, useDispatch} from 'react-redux';
import { Message } from '../components';
import MessageToolbar from './Toolbar';
import Box from '@mui/material/Box';

function MessageList(props) {
  const { messages } = props;

  const [selected, setSelected] = React.useState([]);
  const [activeMessage, setActiveMessage ] =  React.useState({});
  const [active, setActive] = React.useState(false)
  const isAllSelected = messages.length > 0 && selected.length === messages.length;
  const dispatch = useDispatch();

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
    
    if(!selected.length) {
      messages.map((m, index) => {
        return allMessages.push(index);
      });
      
      if (value[value.length - 1] === "all") {
        setSelected(selected.length === messages.length ? [] : allMessages );
        return;
      }
    }
    setSelected(allMessages);
  };


  const handleArchive = () => {
      selected.forEach(index => {
        messages.splice(index, 1);
      });
      console.log(messages, 'm')
      dispatch({type:'GET_INBOX', data: messages});
  };

  //  const handleArchive = messages.filter((item, i) => {
  //   messages.splice(i, 1)
  // })
  
  // const handleArchive = () => {
  //   console.log('handleArchive');
  //   console.log(selected);

  //   messages.splice(selected, selected.length)
  // }

  const handleDelete = () => {
    console.log('handleDelete');
  }

  const renderMessageList = () => {
    return <>
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

  const toolbarOptions = {
    back: handleBack,
    isAllSelected: isAllSelected,
    handleSelectAll:  handleSelectAll,
    messages: messages,
    selected: selected,
    active: active,
    handleArchive,
    handleDelete
  }

  return (
    <React.Fragment> 
    <MessageToolbar options={toolbarOptions}/>
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
  dispatch(getUserInbox('inbox'));
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);