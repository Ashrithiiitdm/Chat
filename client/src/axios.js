import axios from 'axios';

const base_url = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: base_url,
});

axiosInstance.interceptors.request.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong'),

);

export default axiosInstance;