import React, { Component } from 'react';
import { connect } from 'react-redux';
import { controlPanelExecuteCommand, COMMAND_RUN_SWITCH } from '../../actions/controlPanelAction';
import { getSocketUrl } from '../../helpers/apiHelper';

class ItemTextValue extends Component {
    _interval = null;
    _socket = null;
    _isSocketClosed = false;

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

        const socketUrl = getSocketUrl();
        this._socket = new WebSocket(socketUrl);

        this._socket.onopen = ((event) => this.onOpen(event));
        this._socket.onclose = ((event) => this.onAction(event, "--"));
        this._socket.onerror = ((event) => this.onAction(event, "Err"));
        this._socket.onmessage = ((event) => this.onAction(event));
    }

    onOpen(event) {
        console.log(event.type, event);
        this._interval = setInterval(() => {
            this._socket.send(`${this.props.userAuth.id}/${this.props.itemId}`);
        }, 5000);
    }

    onAction(event, text) {
        console.log(event.type, event);
        if (this._isSocketClosed) {
            return;
        }

        if (text) {
            this.setState({textValue: text})
            clearInterval(this._interval);
        } else if (event.data) {
            this.setState({textValue: event.data});
        }
    }

    componentWillUnmount() {
        if (this.props.itemId < 0) {
            return;
        }

        clearInterval(this._interval);
        this._socket.close();
        this._isSocketClosed = true;
    }

    render() {
        return (
            <div>{this.state.textValue}</div>
        );
    }
}

function mapStateToProps({ userAuth }) {
    return { userAuth };
}

export default connect(mapStateToProps, { controlPanelExecuteCommand })(ItemTextValue);
