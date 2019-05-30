import axios from 'axios';
import { getApiUrl } from '../helpers/apiHelper';

export const TEST_CONNECTION = 'test_connection';
export const COMMAND_TEST_CONNECTION = 'test_connection';
export const COMMAND_RUN_SWITCH = 'run_switch';
export const VIDEO_STREAMING = 'video_streaming';
export const VIDEO_STATUS = 'video_status';
export const VIDEO_STOP = 'video_stop';

const BASE_URL = getApiUrl();

export function controlPanelExecuteCommand(command, userId, itemId) {
    var values = {
        userId: userId,
        commandType: command,
        itemId: itemId
    };
    const request = axios.post(`${BASE_URL}/controlpanel/executeCommand`, values, _getAuthHeader());

    return {
        type: values.commandType,
        payload: request
    }
}

function _getAuthHeader() {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
}