import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        const token = userToken?.token ? userToken.token : null
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        // config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        Promise.reject(error)
    }
)