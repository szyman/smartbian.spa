import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class ModalImage extends Component {
    render() {
        return (
            <div>
                <Modal isOpen={this.props.modal} toggle={this.props.hide} size="lg">
                    <ModalHeader toggle={this.props.hide}>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <img className="mb-2" style={{ width: 100 + '%' }} src={`../${this.props.image}`} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default ModalImage;
