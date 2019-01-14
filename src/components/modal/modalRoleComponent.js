import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalRole extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps({roles}) {
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
        alert('A name was submitted: ' + this.state.value);
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
                        onChange={this.handleChange}>
                    </input>
                    <label>{role.name}</label>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Edit Roles for</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderRoles()}
                            <input type="submit" value="Submit" />
                        </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalRole;
