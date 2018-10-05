import _ from 'lodash';
import { USER_LIST, USER_DETAILS, USER_UPDATE } from '../actions/userAction';

export default function(state = {}, action) {
    switch(action.type) {
        case USER_LIST:
            if (!action.payload) {
                return state;
            }

            return _.mapKeys(action.payload.data, 'id');
        case USER_DETAILS:
            if (!action.payload) {
                return state;
            }

            return { ...state, [action.payload.data.id]: action.payload.data }
        case USER_UPDATE:
            if (!action.payload) {
                return state;
            }

            return { ...state, [action.payload.data.id]: action.payload.data }
    }

    return state;
}