import axios from 'axios';

export const LOGIN_USER = 'login_user';
export const LOGOUT_USER = 'logout_user';
export const RESTORE_USER = 'restore_user';
const BASE_URL = 'http://localhost:5000/api/auth';

export function userLogin(values) {
    const request = axios.post(`${BASE_URL}/login`, values)
        .catch(() => {
            console.warn('Failed to login');
        });

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function userLogout() {
    return {
        type: LOGOUT_USER
    }
}
export function userRestore() {
    return {
        type: RESTORE_USER,
        token: localStorage.getItem('token')
    }
}