import axios from 'axios';
import { apiURl } from '../../utils/constants';

const axiosInstance = axios.create({
    baseURL: apiURl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosInstance;