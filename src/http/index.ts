import axios from "axios";

const api = axios.create({
    withCredentials: true
})

api.interceptors.request.use((config) => {
    console.log('Authorization Bearer')
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})
api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config;

    if(error.response.status == 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            const response = await axios.get('/user/refresh', {withCredentials: true});
            const { token } = await response.data;
            localStorage.setItem('token', token);
            return api.request(originalRequest);
        }catch (e){
            console.log('UnAuthorization')
        }

    }
})

export default api;
