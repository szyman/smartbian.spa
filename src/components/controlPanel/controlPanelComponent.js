import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addItem, saveItems, saveNewItems, getItems } from '../../actions/itemAction';
import { controlPanelExecuteCommand, COMMAND_TEST_CONNECTION } from '../../actions/controlPanelAction';
import Item from '../item/itemComponent';
import ModalMessage from '../modal/modalMessageComponent';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.testConnection = this.testConnection.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleEditable = this.toggleEditable.bind(this);
        this.showSaveButton = this.showSaveButton.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        this.state = {
            showConnectionModal: false,
            message: '',
            isEditable: false,
            showSaveButton: false
        };
    }

    componentDidMount() {
        this.props.getItems(this.props.userAuth.id);
    }

    render() {
        return (
            <div className="background-content">
                <div className="container content-background">
                    <Button color="info" className="mr-1" onClick={this.toggleEditable}>Editable {`${this.state.isEditable ? 'On' : 'Off'}`}</Button>
                    <div className={`${this.state.isEditable ? 'show-control-buttons' : 'hide-control-buttons'}`}>
                        <div className="row mb-1 ml-2">
                            <Button color="primary" className="mr-1" onClick={this.testConnection}>Test connection</Button>
                        </div>
                        <div className="row mb-1 ml-2">
                            <Button color="secondary" className="mr-1" onClick={() => this.addItem(0)}>Horizontal</Button>
                            <Button color="secondary" className="mr-1" onClick={() => this.addItem(1)}>Vertical</Button>
                            <Button color="warning" className="mr-1" onClick={() => this.addItem(2)}>
                                <i className="fas fa-lightbulb"></i>
                            </Button><br />
                            <Button color="warning" className="mr-1" onClick={() => this.addItem(3)}>
                                <i className="fas fa-temperature-high"></i>
                            </Button><br />
                        </div>
                        <div className={`row mb-1 ml-2 ${this.state.showSaveButton ? 'visible' : 'invisible'}`}>
                            <Button color="primary" onClick={this.saveChanges}>Save changes</Button>
                        </div>
                    </div>
                    <Item
                        itemList={this.props.itemList}
                        isEditable={this.state.isEditable}
                        showSaveButton={this.showSaveButton}>
                    </Item>
                    <ModalMessage
                        modal={this.state.showConnectionModal}
                        toggle={this.hideModal}
                        title={"Connection info"}
                        message={this.state.message}>
                    </ModalMessage>
                    <br />
                </div>
            </div>
        );
    }

    addItem(type) {
        this.props.addItem(type);
        this.showSaveButton(true);
    }

    testConnection() {
        this.props.controlPanelExecuteCommand(COMMAND_TEST_CONNECTION, this.props.userAuth.id).then(({ payload }) => {
            this.setState({
                showConnectionModal: true,
                message: `Test connetion result: ${payload.data}`
            });
        }).catch((error) => {
            this.setState({
                showConnectionModal: true,
                message: error
            });
        });
    }

    hideModal() {
        this.setState({
            showConnectionModal: false,
            message: ''
        });
    }

    toggleEditable() {
        this.setState({
            isEditable: !this.state.isEditable
        });
    }

    showSaveButton(setVisible) {
        this.setState({
            showSaveButton: setVisible
        });
    }

    saveChanges() {
        const filteredExistItems = _.filter(this.props.itemList, ((i) => i.id >= 0));
        const filteredNewItems = _.filter(this.props.itemList, ((i) => i.id < 0));

        if (filteredExistItems.length > 0) {
            this.props.saveItems(this.props.userAuth.id, filteredExistItems).then(() => {
                this.showSaveButton(false);
            }).catch((error) => {
                this.setState({
                    showConnectionModal: true,
                    message: error
                })
            });
        }

        if (filteredNewItems.length > 0) {
            this.props.saveNewItems(this.props.userAuth.id, filteredNewItems).then(() => {
                this.showSaveButton(false);
            }).catch((error) => {
                this.setState({
                    showConnectionModal: true,
                    message: error
                })
            });
        }
    }
}

function mapStateToProps({ itemList, userAuth }) {
    return { itemList, userAuth };
}

export default connect(mapStateToProps, { addItem, controlPanelExecuteCommand, saveItems, saveNewItems, getItems })(ControlPanel);