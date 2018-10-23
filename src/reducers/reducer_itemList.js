import _ from 'lodash';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM, GET_ITEM, GET_ITEMS, SAVE_ITEM, SAVE_NEW_ITEMS } from '../actions/itemAction';

export default function(state={}, action) {
    switch (action.type) {
        case ADD_ITEM:
            var randomId = _.random(-100);

            return { ...state, [randomId]: {
                    id: randomId,
                    dataX: 0,
                    dataY: 0,
                    style: '',
                    type: action.item,
                    gpio: 0,
                    title: '',
                    ScriptFileName: ''
                }
            }
        case REMOVE_ITEM:
            return _.omit(state, action.id);
        case UPDATE_ITEM:
            _.assignIn(state[action.itemData.id], action.itemData)
            return state;
        case GET_ITEM:
            if (!action.payload) {
                return state;
            }

            return action.payload.data;
        case GET_ITEMS:
            if (!action.payload) {
                return state;
            }

            return _.mapKeys(action.payload.data, 'id');
        case SAVE_ITEM:
            if (!action.payload) {
                return state;
            }

            return { ...state, [action.payload.data.id]: action.payload.data };
        case SAVE_NEW_ITEMS:
            if (!action.payload) {
                return state;
            }

            return _.mapKeys(action.payload.data, 'id');
    };

    return state;
}