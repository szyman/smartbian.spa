import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../item/itemComponent';
class ModalItem extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal} autoFocus={false}>
                <ModalHeader toggle={this.props.toggleModal}>{this.props.itemTitle || 'No title'}</ModalHeader>
                <ModalBody>Press any action</ModalBody>
                <ModalFooter>
                    <div className="d-flex flex-wrap justify-content-end">
                        <Button color="primary" onClick={this.props.removeItem}>Remove</Button>
                        <Link to={`/controlPanel/items/${this.props.itemId}`} className={`btn btn-primary ml-2 mr-2 ${this.props.itemId < 0 ? 'd-none' : ''}`}>
                            Edit
                        </Link>
                        {this.renderExtraButtons()}
                    </div>
                </ModalFooter>
            </Modal>
        );
    }

    renderExtraButtons() {
        if (this.props.itemId < 0) {
            return (
                <div className="alert alert-info mt-2">
                    <strong>Information:</strong> You have not saved changes. Additional functionality was blocked.
                </div>
            );
        }
        if (this.props.type > ITEM_TYPE.VERTICALL_WALL) {
            return (
                <div>
                    <Button color="info" onClick={this.props.switchItem}>Run Script</Button>
                    <Link to={`/controlPanel/items/${this.props.itemId}/script`} className="btn btn-info ml-2">
                        Edit Script
                    </Link>
                </div>
            );
        }
    }
}

export default ModalItem;