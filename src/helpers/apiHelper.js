export function getApiUrl() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        return 'https://smartbian.azurewebsites.net/api';
    }

    return 'http://localhost:5000/api';
}

export function getAuthHeader() {
    return {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    };
}