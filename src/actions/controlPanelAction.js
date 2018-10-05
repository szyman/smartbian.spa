import axios from 'axios';

export const TEST_CONNECTION = 'test_connection';
const BASE_URL = 'http://localhost:5000/api';


export function controlPanelTest(values) {
    const request = axios.post(`${BASE_URL}/controlpanel/testConnection`, values, _getAuthHeader());

    return {
        type: TEST_CONNECTION,
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