import React, { Component } from 'react';

class ItemTextValue extends Component {
    _itemSocket = null;

    constructor(props) {
        super(props)
        this.state = {
            textValue: '--'
        };
    }

    componentWillReceiveProps({ip, socketPort}) {
        if (ip && socketPort) {
            try {
                this._itemSocket = new WebSocket(`wss://${ip}:${socketPort}`);
                this._openItemNotify();
            } catch(error) {
                console.warn('Websocket new', error);
            }
        }
    }

    componentWillUnmount() {
        if (this._itemSocket) {
            this._itemSocket.close();
        }
    }

    render() {
        return (
            <div>{this.state.textValue}</div>
        );
    }

    _openItemNotify() {
        let that = this;

        this._itemSocket.onopen = function () {
            console.log('Websocket onopen');
            that._itemSocket.send('NaN');
        };

        this._itemSocket.onmessage = function (event) {
            console.log('Websocket onmessage', event.data);
            that.setState({
                textValue: event.data
            });
        }
    }
}

export default ItemTextValue;