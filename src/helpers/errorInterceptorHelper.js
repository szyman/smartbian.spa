import axios from 'axios';

export function ErrorInterceptor() {
    axios.interceptors.response.use((response) => {
        return response;
    }, ({response, message}) => {
        if (!response) {
            console.log('ErrorInterceptor', message)
            return Promise.reject(message);
        }
        if (response.status === 401) {
            console.log('ErrorInterceptor', response.statusText)
            return Promise.reject(response.statusText);
        }

        const serverError = response.data;
        let modalStateErrors = '';
        if (typeof serverError === 'object') {
            for (const key in serverError) {
                if (serverError[key]) {
                    modalStateErrors += serverError[key] + '\n';
                }
            }
        }
        console.log('ErrorInterceptor', modalStateErrors || serverError || 'Server Error');
        return Promise.reject(modalStateErrors || serverError || 'Server Error');
    });
}