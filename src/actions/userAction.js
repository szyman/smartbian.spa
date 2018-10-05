import axios from 'axios';

export const REGISTER_USER = 'register_user';
export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const RESTORE_USER = 'restore_user';
export const USER_DETAILS = 'user_details';
export const USER_LIST = 'user_list';
export const USER_UPDATE = 'user_update';
const BASE_URL = 'http://localhost:5000/api';

export function userRegister(values) {
    const request = axios.post(`${BASE_URL}/auth/register`, values);

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function userLogin(values) {
    const request = axios.post(`${BASE_URL}/auth/login`, values);

    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function userLogout() {
    return {
        type: LOGOUT_USER
    };
}
export function userRestore() {
    return {
        type: RESTORE_USER,
        token: localStorage.getItem('token')
    };
}

export function userGetDetails(id) {
    const request = axios.get(`${BASE_URL}/users/${id}`, _getAuthHeader());

    return {
        type: USER_DETAILS,
        payload: request
    };
}

export function userGetList() {
    const request = axios.get(`${BASE_URL}/users`, _getAuthHeader());

    return {
        type: USER_LIST,
        payload: request
    };
}

export function userUpdate(id, updatedValues) {
    const request = axios.put(`${BASE_URL}/users/${id}`, updatedValues, _getAuthHeader());

    return {
        type: USER_UPDATE,
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