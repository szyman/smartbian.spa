import React, { Component } from 'react';
import { Button } from 'reactstrap';

import ModalRole from '../modal/modalRoleComponent';
import { getUsersWithRoles } from '../../actions/adminAction';

class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        getUsersWithRoles().then(({ data }) => {
            this.setState({
                users: data
            });
        }).catch(err => {
            console.error(err);
            this.setState({
                users: []
            });
        });
    }

    renderList() {
        if (_.isEmpty(this.state.users)) {
            return;
        }
        return _.map(this.state.users, user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.userName}</td>
                    <td>{user.roles}</td>
                    <td>
                        <Button color="info" onClick={() => this.toggle({ user })}>Edit Roles</Button>
                    </td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <div className="row">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th style={{ width: '10%' }}>User ID</th>
                                    <th style={{ width: '30%' }}>Username</th>
                                    <th style={{ width: '40%' }}>Active roles</th>
                                    <th style={{ width: '10%' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderList()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ModalRole
                    toggle={this.toggle}
                    modal={this.state.modal}
                    roles={this.state.roles}
                />
            </div>
        );
    }

    toggle({ user }) {
        this.setState({
            modal: !this.state.modal,
            roles: user ? this.getRolesArray(user) : []
        });
    }

    getRolesArray(user) {
        const roles = [];
        const userRoles = user.roles;
        const availableRoles = [
            { name: 'Admin', value: 'Admin' },
            { name: 'Member', value: 'Member' }
        ];

        for (let i = 0; i < availableRoles.length; i++) {
            let isMatch = false;
            for (let j = 0; j < userRoles.length; j++) {
                if (availableRoles[i].name === userRoles[j]) {
                    isMatch = true;
                    availableRoles[i].checked = true;
                    roles.push(availableRoles[i]);
                    break;
                }
            }
            if (!isMatch) {
                availableRoles[i].checked = false;
                roles.push(availableRoles[i]);
            }
        }
        return roles;
    }
}

export default UserAdmin;
