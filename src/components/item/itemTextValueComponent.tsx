import React, { Component } from "react";
import { ServiceBusService } from "../../services/serviceBusService";

interface Props {
    userId: number;
    itemId: number;
    itemTitle: string;
}

interface State {
    textValue: string
}

class ItemTextValue extends Component<Props, State> {
    private _serviceBus: ServiceBusService

    constructor(props: any) {
        super(props)
        this.state = {
            textValue: '--'
        };

    }

    async componentDidMount() {
        if (this.props.itemId < 0) {
            return;
        }

        this._serviceBus = new ServiceBusService(this.dataHandler.bind(this))
        await this._serviceBus.connect(this.props.itemTitle);
    }

    async componentWillUnmount() {
        if (this.props.itemId < 0) {
            return;
        }

        await this._serviceBus.disconnect(this.props.itemTitle);
    }

    dataHandler(data: string) {
        this.setState({ textValue: data })
    }

    render() {
        return (
            <div>{this.state.textValue}</div>
        )
    }
}

export { ItemTextValue };