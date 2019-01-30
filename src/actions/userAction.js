import _ from 'lodash';
import axios from 'axios';
import { getApiUrl, getAuthHeader } from '../helpers/apiHelper';

export const REGISTER_USER = 'register_user';
export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const RESTORE_USER = 'restore_user';
export const USER_DETAILS = 'user_details';
export const USER_LIST = 'user_list';
export const USER_UPDATE = 'user_update';

const BASE_URL = getApiUrl();

export function userRegister(values) {
    const data = _.omit(values, 'confirmPassword');
    const request = axios.post(`${BASE_URL}/auth/register`, data);

    return {
        type: REGISTER_USER,
        payload: request
    };
}

export function userLogin(values) {
    const data = _.omit(values, 'confirmPassword');
    const request = axios.post(`${BASE_URL}/auth/login`, data);

    return {
        type: LOGIN_USER,
        payload: request
    };
}

export function userLoginExtProvider(values) {
    const request = axios.post(`${BASE_URL}/auth/loginExtProvider`, values);

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
    const request = axios.get(`${BASE_URL}/users/${id}`, getAuthHeader());

    return {
        type: USER_DETAILS,
        payload: request
    };
}

export function userGetList() {
    const request = axios.get(`${BASE_URL}/users`, getAuthHeader());

    return {
        type: USER_LIST,
        payload: request
    };
}

export const userUpdate = (id, updatedValues) => async dispatch => {
    const response = await axios.put(`${BASE_URL}/users/${id}`, updatedValues, getAuthHeader());

    dispatch({ type: USER_UPDATE, payload: response.data });
}

export function userGetSshKey(id) {
    const request = axios.get(`${BASE_URL}/users/${id}/getSshKey`, getAuthHeader());

    return request;
}

export function userSaveSshKey(id, sshKey) {
    sshKey = sshKey.replace(/"/g, "'");
    const request = axios.put(`${BASE_URL}/users/${id}/saveSshKey`, `"${sshKey}"`, getAuthHeader());

    return request;
}