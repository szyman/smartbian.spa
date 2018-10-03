import _ from 'lodash';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../actions/itemAction';

export default function(state={}, action) {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, [_.size(state)]: {
                    id: _.size(state),
                    type: action.item,
                    dataX: 0,
                    dataY: 0,
                    width: ''
                }
            }
        case REMOVE_ITEM:
            return _.omit(state, action.id);
        case UPDATE_ITEM:
            _.assignIn(state[action.itemData.id], action.itemData)
            return state;
    };

    return state;
}