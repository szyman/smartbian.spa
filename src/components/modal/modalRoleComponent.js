import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalRole extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps({ roles }) {
        if (!roles.length) {
            return;
        }

        for (let i = 0; i < roles.length; i++) {
            this.setState({
                [roles[i].name]: roles[i]
            });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let role = Object.assign({}, this.state[name]);
        role.checked = value;

        this.setState({
            [name]: role
        });
    }

    handleSubmit(event) {
        const rolesArray = _.values(this.state);
        const rolesToUpdate = {
            roleNames: [...rolesArray.filter(el => el.checked === true).map(el => el.name)]
        };
        this.props.submitRoles(rolesToUpdate);
        event.preventDefault();
    }

    renderRoles() {
        return _.map(this.props.roles, role => {
            return (
                <div className="form-check" key={role.name}>
                    <input type="checkbox"
                        className="form-check-input"
                        name={role.name}
                        checked={this.state[role.name].checked}
                        onChange={this.handleChange}
                        disabled={role.name === 'Admin' && this.props.userName === 'admin'}>
                    </input>
                    <label>{role.name}</label>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggleModal} className={this.props.className}>
                    <ModalHeader>Edit Roles for {this.props.userName}</ModalHeader>
                    <form onSubmit={this.handleSubmit}>
                        <ModalBody>
                            {this.renderRoles()}
                        </ModalBody>
                        <ModalFooter>
                            <input className="btn btn-primary" type="submit" value="Submit" />
                            <Button color="secondary" onClick={this.props.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </form>
                </Modal>
            </div>
        );
    }
}

export default ModalRole;
