import React from 'react';
import { connect } from 'react-redux';

import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Divider } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';


function MessageToolbar({options}) {
    const { back, isAllSelected, messages,
            selected, handleSelectAll, active,
            handleDelete, handleRefresh
        } = options;

    console.log(selected, 'selected');

    const listToolbar = () => {
        return (
            <React.Fragment>
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

                { selected.length > 0 ?
                    <>
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                :
                    <IconButton aria-label="back" onClick={handleRefresh}>
                        <RefreshIcon />
                    </IconButton>
                }
            </React.Fragment>
        )
    }

    const messageToolbar = () => {
        return (
            <React.Fragment>
                <IconButton aria-label="back" onClick={ () => back() }>
                    <ArrowBackIcon />
                </IconButton>
            </React.Fragment>
        )
    }

    return (
        <>
        <div className="app-toolbar">
            { active ? 
                messageToolbar()
            :
                listToolbar()
            }
        </div>
        <Divider/>
        </>
    )
}

export default connect()(MessageToolbar);
