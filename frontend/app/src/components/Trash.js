import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getTrashMessages } from '../redux/message/actions'


function Trash(props) {
    const {getTrashMessages} = props;
    const [trash, setTrash] = useState([]);
    
    useEffect(() => {
        async function init(){
            const data = await getTrashMessages();
            setTrash(data);
        };
        init();
    }, [getTrashMessages]);

    return (
        <React.Fragment>
        <div>
            { trash.map((msg, i) => {
                return <p key={i}>{msg.title}</p>
            })
            }
            </div>
        </React.Fragment>
    )
}

export default connect(null, {
    getTrashMessages,
})(Trash);
