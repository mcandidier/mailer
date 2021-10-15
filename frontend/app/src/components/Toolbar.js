import React from 'react'

import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Divider } from '@mui/material';


function MessageToolbar({handleBack}) {

    return (
        <>
        <div className="app-toolbar">
            <IconButton aria-label="back" onClick={ () => handleBack() }>
                <ArrowBackIcon />
            </IconButton>
        </div>
        <Divider/>
        </>
    )
}

export default MessageToolbar;
