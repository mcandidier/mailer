import React from 'react'

import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';


function MessageToolbar({handleBack, selected, selectAll}) {

    const handleSelectAll = () => {
        console.log('select all');
    }

    const listToolbar = () => {
        return (
            <React.Fragment>
            <Checkbox
                edge="start"
                tabIndex={-1}
                inputProps={{ 'aria-labelledby': 'select-all' }}
                onClick={handleSelectAll}
            />

            <IconButton aria-label="back">
                <RefreshIcon />
            </IconButton>
            </React.Fragment>
        )
    }

    const messageToolbar = () => {
        return (
            <React.Fragment>
                <IconButton aria-label="back" onClick={ () => handleBack() }>
                    <ArrowBackIcon />
                </IconButton>
            </React.Fragment>
        )
    }

    return (
        <>
        <div className="app-toolbar">
            { selected ? 
                messageToolbar()
            :
                listToolbar()
            }
        </div>
        <Divider/>
        </>
    )
}

export default MessageToolbar;
