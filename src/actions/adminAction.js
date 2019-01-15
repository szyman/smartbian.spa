import axios from 'axios';
import { getApiUrl, getAuthHeader } from '../helpers/apiHelper';

const BASE_URL = getApiUrl();

export function getUsersWithRoles() {
    const request = axios.get(`${BASE_URL}/admin/usersWithRoles`, getAuthHeader());
    return request;
}

export function updateUserRoles(userName, roles) {
    const request = axios.post(`${BASE_URL}/admin/editRoles/${userName}`, roles, getAuthHeader());
    return request;
}
