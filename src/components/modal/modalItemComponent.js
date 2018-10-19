import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../item/itemComponent';
import ModalConnection from '../modal/modalConnectionComponent';

class ModalItem extends Component {
    render() {
        return (
            <Modal isOpen={this.props.modal}>
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
                <div>
                    <ModalConnection
                        buttonClassName="w-100 mb-2"
                        buttonTitle={"Switch"}
                        headerTitle={"Switch item"}
                        submitAction={this.props.switchItem}
                    />
                    <Link to={`/controlPanel/items/${this.props.itemId}`}>
                        <Button className="w-100 mb-2" color="primary">Edit</Button>
                    </Link>
                </div>
            );
        }
    }
}

export default ModalItem;