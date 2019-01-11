import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalRole extends Component {
    constructor(props) {
        super(props);
        this.state = { roles: [] };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    renderRoles() {
        return _.map(this.props.roles, role => {
            return (
                <div className="form-check" key={role.name}>
                    <input type="checkbox" className="form-check-input" value={role.name} checked={role.checked} onChange={this.handleChange}></input>
                    <label>{role.name}</label>
                </div>
            )
        })
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