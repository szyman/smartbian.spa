import React, { Component } from 'react';
import { ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITEM_TYPE } from '../item/itemComponent';

class ModalItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rSelected: -1
        };

        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    render() {
        return (
            <Modal isOpen={this.props.modal} onClosed={() => this.setState({ rSelected: -1 })}>
                <ModalHeader toggle={this.props.toggleModal}>
                    {this.props.itemTitle || 'No title'}
                    {this.renderNotSavedInfo()}
                </ModalHeader>
                <ModalBody>
                    <h5>Press any action</h5>
                    <ButtonGroup>
                        <Button color="primary" onClick={() => this.onRadioBtnClick(0)} active={this.state.rSelected === 0}>Remove</Button>
                        {this.renderExtraButtons()}
                    </ButtonGroup>
                </ModalBody>
                <ModalFooter>
                    {this.renderActionButton()}
                </ModalFooter>
            </Modal>
        );
    }

    renderNotSavedInfo() {
        if (this.props.itemId < 0) {
            return (
                <div className="alert alert-info mt-2">
                    <strong>Information:</strong> You have not saved changes. Additional functionality was blocked.
                </div>
            );
        }
    }

    renderExtraButtons() {
        if (this.props.type === ITEM_TYPE.HORIZONTAL_WALL || this.props.type === ITEM_TYPE.VERTICALL_WALL ||
            this.props.itemId < 0) {
            return;
        }

        if (this.props.type === ITEM_TYPE.CAMERA) {
            return (
                <>
                <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>Show stream</Button>
                </>
            )
        }

        return (
            <>
                <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Edit</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Edit script</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Run script</Button>
            </>
        );
    }

    renderActionButton() {
        switch (this.state.rSelected) {
            case 0:
                return <Button color="secondary" onClick={this.props.removeItem}>Remove</Button>;
            case 1:
                return (
                    <Link to={`/controlPanel/items/${this.props.itemId}`} className="btn btn-secondary">
                        Edit
                    </Link>
                );
            case 2:
                return (
                    <Link to={`/controlPanel/items/${this.props.itemId}/script`} className="btn btn-secondary">
                        Edit script
                    </Link>
                );
            case 3:
                return <Button color="secondary" onClick={this.props.switchItem}>Run Script</Button>
            case 4:
                return (
                    <Link to={`/controlPanel/items/${this.props.itemId}/stream`} className="btn btn-secondary">
                    Show stream
                </Link>
                );
        }
    }

    onRadioBtnClick(rSelected) {
        this.setState({ rSelected });
    }
}

export default ModalItem;
