import { REGISTER_USER, LOGIN_USER, LOGOUT_USER, RESTORE_USER } from '../actions/userAction';

export default function(state = {}, action) {
    switch(action.type) {
        case REGISTER_USER:
            return state;
        case LOGIN_USER:
            if (!action.payload) {
                return state;
            }
            localStorage.setItem('token', action.payload.data.token);
            return { token: action.payload.data.token };
        case LOGOUT_USER:
            return { token: null };
        case RESTORE_USER:
            return { token: action.token };
    }
    return state;
}