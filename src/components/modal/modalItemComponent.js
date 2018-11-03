import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../item/itemComponent';

class ModalItem extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal}>
                <ModalHeader toggle={this.props.toggleModal}>Modal title</ModalHeader>
                <ModalBody>
                    <Button className="w-100 mb-2" color="primary" onClick={this.props.removeItem}>Remove</Button>
                    {this.renderButtons()}
                </ModalBody>
            </Modal>
        );
    }

    renderButtons() {
        if (this.props.type === ITEM_TYPE.ELEMENT) {
            return (
                <div>
                    <Link to={`/controlPanel/items/${this.props.itemId}`} className="btn btn-primary w-100 mb-2">
                        Edit
                    </Link>
                    <Button className="w-100 mb-2" color="info" onClick={this.props.switchItem}>Run Script</Button>
                    <Link to={`/controlPanel/items/${this.props.itemId}/script`} className="btn btn-info w-100 mb-2">
                        Edit Script
                    </Link>
                </div>
            );
        }
    }
}

export default ModalItem;