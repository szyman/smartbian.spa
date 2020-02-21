import * as signalR from '@aspnet/signalr';
import { getSocketUrl } from '../helpers/apiHelper';

export class ServiceBusService {
    _connection: signalR.HubConnection = null;
    _datadataHandlerCallback: (data: any) => {};

    constructor(dataHandlerCallback: (data: any) => {}) {
        const websocketUrl = getSocketUrl();
        this._connection = new signalR.HubConnectionBuilder()
            .withUrl(websocketUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();
        this._connection.on("notifyIoTQueueValue", dataHandlerCallback);
    }

    async disconnect(ioTQueueName: string) {
        await this._connection.invoke("subscribeOnIoTQueue", ioTQueueName, true);

        this._connection.off("notifyIoTQueueValue");
        await this._connection.stop();
    }

    async connect(ioTQueueName: string) {
        try {
            await this._connection.start();
            await this._connection.invoke("subscribeOnIoTQueue", ioTQueueName, false);
        } catch (err) {
            console.error(err);
        }
    }
}