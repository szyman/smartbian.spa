import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserLogin from '../user/userLoginComponent';
import { connect } from 'react-redux';
import { Collapse, NavbarToggler } from 'reactstrap';
import _ from 'lodash';

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    renderUserMenu() {
        if (!_.isEmpty(this.props.userAuth)) {
            return (
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/setup'>Setup</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/controlPanel'>Control Panel</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/users'>Users</NavLink>
                    </li>
                </ul>

            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Smartbian</Link>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {this.renderUserMenu()}
                    <UserLogin></UserLogin>
                </Collapse>
            </nav>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps)(Navbar);