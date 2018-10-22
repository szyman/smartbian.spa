import axios from 'axios';

export const TEST_CONNECTION = 'test_connection';
export const COMMAND_TEST_CONNECTION = 'test_connection';
export const COMMAND_RUN_SWITCH = 'run_switch';

const BASE_URL = 'http://localhost:5000/api';

export function controlPanelExecuteCommand(command, userId) {
    var values = {
        userId: userId,
        commandType: command
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