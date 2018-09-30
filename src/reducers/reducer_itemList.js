import _ from 'lodash';
import { ADD_ITEM, REMOVE_ITEM } from '../actions/itemAction';

export default function(state={}, action) {
    switch (action.type) {
        case ADD_ITEM:
            return { ...state, [_.size(state)]: {
                    id: _.size(state),
                    type: action.item
                }
            }
        case REMOVE_ITEM:
            return _.omit(state, action.id);
    };

    return state;
}