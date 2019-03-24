import React, { Component } from 'react';
import { connect } from 'react-redux';
import { controlPanelExecuteCommand, COMMAND_RUN_SWITCH } from '../../actions/controlPanelAction';

class ItemTextValue extends Component {
    _interval = null;

    constructor(props) {
        super(props)
        this.state = {
            textValue: '--'
        };
    }

    componentDidMount() {
        if (this.props.itemId < 0) {
            return;
        }

        this._interval = setInterval(() => {
            this.props.controlPanelExecuteCommand(COMMAND_RUN_SWITCH, this.props.userId, this.props.itemId).then(({ payload }) => {
                this.setState({ textValue: payload.data });
            }).catch((error) => {
                console.warn('ItemTextValue', error);
            });
        }, 5000);
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        return (
            <div>{this.state.textValue}</div>
        );
    }
}

export default connect(null, { controlPanelExecuteCommand })(ItemTextValue);
