import React, { Component } from 'react';
import UserLogin from '../user/userLoginComponent';
import { userLogout, userRestore } from '../../actions/userAction';
import { connect } from 'react-redux';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.userRestore();
    }

    logout(event) {
        event.preventDefault();
        localStorage.removeItem('token');
        this.props.userLogout();
        console.log('logged out');
    }

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
                    <li className="nav-item" onClick={this.logout}>
                        <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>

                <UserLogin></UserLogin>
            </nav>
        );
    }
}

export default connect(null, { userLogout, userRestore })(Navbar);