import axios from 'axios';
import _ from 'lodash';
import { getApiUrl, getAuthHeader } from '../helpers/apiHelper';

export const ADD_ITEM = 'add_item';
export const REMOVE_ITEM = 'remove_item';
export const UPDATE_ITEM = 'update_item';
export const GET_ITEM = 'get_item';
export const GET_ITEMS = 'get_items';
export const SAVE_ITEMS = 'save_items';
export const SAVE_NEW_ITEMS = 'save_new_items';
export const SAVE_ITEM = 'save_item';

const BASE_URL = getApiUrl();

export function addItem(itemType) {
    return {
        type: ADD_ITEM,
        item: itemType
    }
}

export function removeItem(itemId) {
    if (itemId >= 0) {
        const request = axios.delete(`${BASE_URL}/blocks/${itemId}`, getAuthHeader());
        return {
            type: REMOVE_ITEM,
            payload: request
        }
    } else {
        return {
            type: REMOVE_ITEM,
            id: itemId
        }
    }

}

export function updateItem(data) {
    return {
        type: UPDATE_ITEM,
        itemData: data
    }
}

export const getItem = (itemId) => async dispatch => {
    const response = await axios.get(`${BASE_URL}/blocks/${itemId}`, getAuthHeader());

    dispatch( {
        type: GET_ITEM,
        payload: response.data
    });
}

export const getItems = (id) => async dispatch => {
    const response = await axios.get(`${BASE_URL}/blocks/all/${id}`, getAuthHeader());

    dispatch({ type: GET_ITEMS, payload: response.data });
};

export function saveItems(userId, filteredItems) {
    const request = axios.post(`${BASE_URL}/blocks/${userId}`, filteredItems, getAuthHeader());

    return {
        type: SAVE_ITEMS,
        payload: request
    }
}

export function saveNewItems(userId, filteredItems) {
    let itemsWithNoId = [];
    _.forEach(filteredItems, (item) => itemsWithNoId.push(_.omit(item, ['id'])));
    const request = axios.post(`${BASE_URL}/blocks/addNewItems/${userId}`, itemsWithNoId, getAuthHeader());

    return {
        type: SAVE_NEW_ITEMS,
        payload: request
    }
}

export function saveItem(itemId, values) {
    const request = axios.put(`${BASE_URL}/blocks/${itemId}`, values, getAuthHeader());

    return {
        type: SAVE_ITEM,
        payload: request
    }
}

export function readScriptItem(itemId) {
    const request = axios.get(`${BASE_URL}/blocks/getScript/${itemId}`, getAuthHeader());

    return request;
}

export function saveScriptItem(itemId, script) {
    script = script.replace(/"/g, "'");
    const request = axios.put(`${BASE_URL}/blocks/uploadScript/${itemId}`, `"${script}"`, getAuthHeader());

    return request;
}
