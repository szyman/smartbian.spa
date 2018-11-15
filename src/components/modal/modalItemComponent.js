import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../item/itemComponent';

class ModalItem extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal}>
                <ModalHeader toggle={this.props.toggleModal}>Modal title</ModalHeader>
                <ModalBody>Press any action</ModalBody>
                <ModalFooter>
                    {this.renderButtons()}
                </ModalFooter>
            </Modal>
        );
    }

    renderButtons() {
        if (this.props.type === ITEM_TYPE.ELEMENT) {
            return (
                <div>
                    <div className="d-block mb-2">
                        <Button color="primary" onClick={this.props.removeItem}>Remove</Button>
                        <Link to={`/controlPanel/items/${this.props.itemId}`} className="btn btn-primary ml-2">
                            Edit
                        </Link>
                    </div>
                    <div className="d-block">
                        <Button color="info" onClick={this.props.switchItem}>Run Script</Button>
                        <Link to={`/controlPanel/items/${this.props.itemId}/script`} className="btn btn-info ml-2">
                            Edit Script
                        </Link>
                    </div>
                </div>
            );
        }
    }
}

export default ModalItem;