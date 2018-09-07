import jwt_decode from "jwt-decode";
import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, RESTORE_USER } from '../actions/userAction';

export default function(state = {}, action) {
    let decodedToken;

    switch(action.type) {
        case REGISTER_USER:
            return state;
        case LOGIN_USER:
            if (!action.payload) {
                return state;
            }

            localStorage.setItem('token', action.payload.data.token);
            decodedToken = jwt_decode(action.payload.data.token);

            return _getLoggedUser(decodedToken);
        case LOGOUT_USER:
            return { };
        case RESTORE_USER:
            if (!action.token) {
                return state;
            }

            decodedToken = jwt_decode(action.token);

            if (decodedToken && !_isTokenExpired(decodedToken)) {
                return (_getLoggedUser(decodedToken));
            }

            return state;
    }
    return state;
}

function _isTokenExpired(jwt) {
    const current_time = new Date().getTime() / 1000;
	if (current_time > jwt.exp) {
        return true;
    }

    return false;
}

function _getLoggedUser(decodedToken) {
    if (!decodedToken) {
        return { };
    }

    return {
        id: decodedToken.nameid,
        username: decodedToken.unique_name
    };
}