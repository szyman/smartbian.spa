import axios from 'axios';
import _ from 'lodash';

export const ADD_ITEM = 'add_item';
export const REMOVE_ITEM = 'remove_item';
export const UPDATE_ITEM = 'update_item';
export const GET_ITEMS = 'get_items';
export const SAVE_ITEMS = 'save_items';

const BASE_URL = 'http://localhost:5000/api';

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

export function updateItem(data) {
    return {
        type: UPDATE_ITEM,
        itemData: data
    }
}

export function getItems(id) {
    const request = axios.get(`${BASE_URL}/blocks/${id}`, _getAuthHeader());

    return {
        type: GET_ITEMS,
        payload: request
    }
}

export function saveItems(id, items) {
    var itemsArray = [];
    var itemToSend;
    for (var item in items) {
        //TODO: Always creating new items
        itemToSend = _.omit(items[item], 'id');
        itemsArray.push(itemToSend);
    }

    const request = axios.post(`${BASE_URL}/blocks/${id}`, itemsArray, _getAuthHeader());

    return {
        type: SAVE_ITEMS,
        payload: request
    }
}

function _getAuthHeader() {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    };
}