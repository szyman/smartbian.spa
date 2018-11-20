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
        if (!this._itemSocket && ip && socketPort) {
            try {
                this._itemSocket = new WebSocket(`ws://${ip}:${socketPort}/`);
                this._openItemNotify();
            } catch(error) {
                console.warn('Websocket new', error);
            }
        }
    }

    componentWillUnmount() {
        //1 - Open
        if (this._itemSocket && this._itemSocket.readyState === 1) {
            this._itemSocket.close();
            this._itemSocket = null;
        }
    }

    render() {
        return (
            <div>{this.state.textValue}</div>
        );
    }

    _openItemNotify() {
        let that = this;

        this._itemSocket.onmessage = function (event) {
            console.log('Websocket onmessage', event.data);
            that.setState({
                textValue: event.data
            });
        }
    }
}

export default ItemTextValue;