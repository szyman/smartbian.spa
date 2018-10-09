import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import { addItem } from '../../actions/itemAction';
import { controlPanelTest } from '../../actions/controlPanelAction';
import Item from '../item/itemComponent';
import ModalConnection from '../modal/modalConnectionComponent';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.testConnection = this.testConnection.bind(this);
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
                <div className="row mb-5 ml-2">
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(0)}>Horizontal</Button>
                    <Button color="secondary" className="mr-1" onClick={() => this.addItem(1)}>Vertical</Button>
                    <Button color="warning" className="mr-1" onClick={() => this.addItem(2)}>
                        <i className="fas fa-lightbulb"></i>
                    </Button><br />

                </div>
                <Item></Item>
            </div>
        );
    }

    addItem(type) {
        this.props.addItem(type);
    }

    testConnection(formValues, connectionValues) {
        const dataConnection = _.assignIn(connectionValues, formValues)

        this.props.controlPanelTest(dataConnection).then(({ payload }) => {
            console.log(`Test connetion result: ${payload.data}`);
        });
    }
}

export default connect(null, { addItem, controlPanelTest })(ControlPanel);