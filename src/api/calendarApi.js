import axios from 'axios';
import { getEnvVatiables } from '../helpers';

const { VITE_API_URL } = getEnvVatiables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

//? Aca configuraremos interceptores para modificar los headers
calendarApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})

export default calendarApi;