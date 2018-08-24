import React, { Component } from 'react';
import UserLogin from '../user/userLoginComponent'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a className="navbar-brand" href="#">SmartRooms App</a>

                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Matches</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Lists</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Messages</a>
                    </li>
                </ul>

                <UserLogin></UserLogin>
            </nav>
        );
    }
}

export default Navbar;