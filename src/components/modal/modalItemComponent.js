import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ITEM_TYPE } from '../item/itemComponent';

class ModalItem extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggleModal}>
                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <Button className="w-100 mb-2" color="primary" onClick={this.props.removeItem}>Remove</Button>
                    {this.renderButtons()}
                </ModalBody>
                <ModalFooter>
                    <Button className="w-100" color="secondary" onClick={this.props.toggleModal}>Cancel</Button><br />
                </ModalFooter>
            </Modal>
        );
    }

    renderButtons() {
        if (this.props.type === ITEM_TYPE.ELEMENT) {
            return (
                <Button className="w-100 mb-2" color="primary" onClick={this.props.switchItem}>Switch</Button>
            );
        }
    }
}

export default ModalItem;