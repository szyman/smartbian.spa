import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addItem } from '../../actions/itemAction';
import { controlPanelExecuteCommand, COMMAND_TEST_CONNECTION } from '../../actions/controlPanelAction';
import Item from '../item/itemComponent';
import ModalConnection from '../modal/modalConnectionComponent';
import ModalMessage from '../modal/modalMessageComponent';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.testConnection = this.testConnection.bind(this);
        this.hideModal = this.hideModal.bind(this);

        this.state = {
            showConnectionModal: false,
            message: ''
        };
    }

    render() {
        return (
            <div>
                <div className="row mb-1 ml-2">
                    <ModalConnection
                        buttonClassName={"mr-1"}
                        buttonTitle={"Test connection"}
                        headerTitle={"Test connection"}
                        submitAction={this.testConnection}
                    />
                </div>
                <div className="row mb-1 ml-2">
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(0)}>Horizontal</Button>
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(1)}>Vertical</Button>
                    <Button color="warning" className="mr-1" onClick={() => this.addItem(2)}>
                        <i className="fas fa-lightbulb"></i>
                    </Button><br />
                </div>
                <Item></Item>
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

    testConnection(formValues, connectionValues) {
        const dataConnection = _.assignIn(connectionValues, formValues, { commandType: COMMAND_TEST_CONNECTION });

        this.props.controlPanelExecuteCommand(dataConnection).then(({ payload }) => {
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
}

export default connect(null, { addItem, controlPanelExecuteCommand })(ControlPanel);