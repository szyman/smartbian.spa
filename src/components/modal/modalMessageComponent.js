import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalMessage extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.toggle}>
                    <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        {this.props.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.toggle}>OK</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalMessage;