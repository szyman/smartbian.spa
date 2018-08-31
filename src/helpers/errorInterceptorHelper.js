import axios from 'axios';

export function ErrorInterceptor() {
    axios.interceptors.response.use((response) => {
        return response;
    }, (error) => {
        if (error.response.status === 401) {
            console.log(error.response.statusText)
            return;
        }
        const serverError = error.response.data;
        let modalStateErrors = '';
        if (typeof serverError === 'object') {
            for (const key in serverError) {
                if (serverError[key]) {
                    modalStateErrors += serverError[key] + '\n';
                }
            }
        }
        console.log(modalStateErrors || serverError || 'Server Error');
        return;
    });
}