export const LOGIN_USER = 'login_user';

export function createUser(values, callback) {
    const request = 'user_login'

    return {
        type: LOGIN_USER,
        payload: request
    }
}