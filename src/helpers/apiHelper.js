export function getApiUrl() {
    if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
        return 'http://192.168.100.3:5000/api';
    }

    return 'http://localhost:5000/api';
}