import axios from 'axios';

export const LOGIN_USER = 'login_user';
const BASE_URL = 'http://localhost:5000/api/auth';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function userLogin(values) {
    const request = axios.post(`${BASE_URL}/login`, values)
        .then((response) => {
            //const user = response;
            //if (user) {
            //    localStorage.setItem('token', user.token);
            //}
            console.log('Logged in successfully');
        })
        .catch(() => {
            console.warn('Failed to login');
        });

    return {
        type: LOGIN_USER,
        payload: request
    }
}