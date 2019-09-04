import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as signalR from '@aspnet/signalr';
import { controlPanelExecuteCommand } from '../../actions/controlPanelAction';
import { getSocketUrl } from '../../helpers/apiHelper';

class ItemTextValue extends Component {
    _interval = null;
    _isSocketClosed = false;
    _connection = null;

    constructor(props) {
        super(props)
        this.state = {
            textValue: '--'
        };
    }

    async componentDidMount() {
        if (this.props.itemId < 0) {
            return;
        }

        const socketUrl = getSocketUrl();
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(socketUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this._connection.on("ReceiveBlockStatus", (result) => {
            if (this._isSocketClosed) {
                return;
            }
            console.log("HUB result" + result);
            this.setState({ textValue: result })
        });

        this._connection.on("ReceiveBlockStatusError", (result) => {
            if (this._isSocketClosed) {
                return;
            }
            console.error(result);
            this.setState({ textValue: "Err" });
        });

        try {
            await this._connection.start();
            this._connection.invoke("GetBlockStatus", this.props.userAuth.id, this.props.itemId);
            this._interval = setInterval(() => {
                this._connection.invoke("GetBlockStatus", this.props.userAuth.id, this.props.itemId);
            }, 5000);
        } catch(err) {
            console.error(err);
        }
    }

    componentWillUnmount() {
        if (this.props.itemId < 0) {
            return;
        }

        clearInterval(this._interval);
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
