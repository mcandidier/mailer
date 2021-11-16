import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';

import { Sidebar, MessageForm } from '../components'; 

import { useLocation} from 'react-router-dom';
import { setFilter } from '../redux/message/actions';
import { useDispatch } from 'react-redux';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/mcandidier">
        mcandidier
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const mdTheme = createTheme();

function Main({component}) {
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch();
  const {pathname} = useLocation();
  dispatch(setFilter(pathname.replace('/', '')));
  
  const toggleMessageForm = () => {
    setToggleForm(!toggleForm)
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        {toggleForm && 
          <MessageForm toggle={toggleMessageForm}/>
        }

        <Sidebar toggle={toggleMessageForm} />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="xl" sx={{ mt: 10, mb: 4, pl: 0, pr: 0, pt: 0 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                  }}
                  component={component}
                >
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default connect(null, {
})(Main);
