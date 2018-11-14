import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addItem } from '../../actions/itemAction';
import { controlPanelExecuteCommand, COMMAND_TEST_CONNECTION } from '../../actions/controlPanelAction';
import Item from '../item/itemComponent';
import ModalMessage from '../modal/modalMessageComponent';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.testConnection = this.testConnection.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.toggleEditable = this.toggleEditable.bind(this);

        this.state = {
            showConnectionModal: false,
            message: '',
            isEditable: false
        };
    }

    render() {
        return (
            <div>
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
                    </div>
                </div>
                <Item isEditable={this.state.isEditable}></Item>
                <ModalMessage
                    modal={this.state.showConnectionModal}
                    toggle={this.hideModal}
                    title={"Connection info"}
                    message={this.state.message}>
                </ModalMessage>
            </div>
        );
    }

    addItem(type) {
        this.props.addItem(type);
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
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps, { addItem, controlPanelExecuteCommand })(ControlPanel);