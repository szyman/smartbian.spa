export const ADD_ITEM = 'add_item';
export const REMOVE_ITEM = 'remove_item';

export function addItem(itemType) {
    return {
        type: ADD_ITEM,
        item: itemType
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id: id
    }
}