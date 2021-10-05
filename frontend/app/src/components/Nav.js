import React from 'react'
import { connect } from 'react-redux'

import { handleLogout } from '../redux/auth/actions';

const Nav = props => {
    const {user, handleLogout} = props;

    const logout = () => {
        handleLogout();
    }

    return (
        <div>
            {user.loggedIn ? `hello ${user.user.username}` : 'login'}
            {user.loggedIn ?
            <div  onClick={ () => logout() }>logout</div>
            : ''}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {
    handleLogout
})(Nav);