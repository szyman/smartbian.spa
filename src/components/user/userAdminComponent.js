import React, { Component } from 'react';
import { Button } from 'reactstrap';

import ModalRole from '../modal/modalRoleComponent';
import { getUsersWithRoles, updateUserRoles } from '../../actions/adminAction';

class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            roles: [],
            modal: false,
            userName: ''
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.submitRoles = this.submitRoles.bind(this);
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
                        <Button color="info" onClick={() => this.toggleModal(user)}>Edit Roles</Button>
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
                    toggleModal={this.toggleModal}
                    modal={this.state.modal}
                    roles={this.state.roles}
                    userName={this.state.userName}
                    submitRoles={this.submitRoles}
                />
            </div>
        );
    }

    toggleModal(user) {
        this.setState({
            modal: !this.state.modal,
            roles: user && user.roles ? this._getRolesArray(user) : [],
            userName: user && user.userName ? user.userName : ''
        });
    }

    submitRoles(roles) {
        const that = this;
        let users = {...this.state.users};
        const userName = this.state.userName;
        updateUserRoles(this.state.userName, roles).then(({ data }) => {
            let modifiedUserKey = _.findKey(users, u => u.userName === userName)
            users[modifiedUserKey].roles = data;
            that.setState({
                users: users
            });
        }).catch(err => {
            console.error(err);
        });

        this.toggleModal();
    }

    _getRolesArray(user) {
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
