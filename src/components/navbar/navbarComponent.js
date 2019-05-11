import _ from 'lodash';
import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Collapse, NavbarToggler, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

import UserLogin from '../user/userLoginComponent';
import { isAdminRole } from '../../helpers/authHelper'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    renderWikiMenu() {
        return (
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>Wiki</DropdownToggle>
                <DropdownMenu>
                    <Link to='/wiki'>
                        <DropdownItem>How to start</DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <Link to='/wiki/ssh'>
                        <DropdownItem>Set up SSH connection</DropdownItem>
                    </Link>
                    <Link to='/wiki/forwarding'>
                        <DropdownItem>Access Raspberry over internet</DropdownItem>
                    </Link>
                    <Link to='/wiki/light'>
                        <DropdownItem>Remote light switcher</DropdownItem>
                    </Link>
                    <Link to='/wiki/temperature'>
                        <DropdownItem>Temperature sensor</DropdownItem>
                    </Link>
                    <Link to='/wiki/motion'>
                        <DropdownItem>Montion sensor</DropdownItem>
                    </Link>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }

    renderMenu() {
        if (!_.isEmpty(this.props.userAuth)) {
            return (
                <ul className="navbar-nav mr-auto">
                    {this.renderWikiMenu()}
                    <li className="nav-item">
                        <NavLink className="nav-link" activeClassName='active' to='/controlPanel'>Control Panel</NavLink>
                    </li>
                    {this.renderAdminMenu()}
                </ul>
            );
        }
    }

    renderAdminMenu() {
        if (isAdminRole(this.props.userAuth)) {
            return (
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName='active' to='/admin'>Admin</NavLink>
                </li>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Smartbian</Link>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    {this.renderMenu()}
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