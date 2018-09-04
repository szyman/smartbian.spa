import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserLogin from '../user/userLoginComponent';
import { connect } from 'react-redux';
import _ from 'lodash';

class Navbar extends Component {
    constructor(props) {
        super(props);
    }

    renderUserMenu() {
        if (!_.isEmpty(this.props.user)) {
            return (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/setup'>Setup</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/controlPanel'>Control Panel</NavLink>
                    </li>
                </ul>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
                <div className="container">
                    <Link className="navbar-brand" to="/">SmartRooms App</Link>

                    {this.renderUserMenu()}

                    <UserLogin></UserLogin>
                </div>
            </nav>
        );
    }
}

function mapStateToProps({ user }){
    return { user };
}

export default connect(mapStateToProps)(Navbar);