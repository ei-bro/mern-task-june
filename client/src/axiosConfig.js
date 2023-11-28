import axios from 'axios';

const axiosConfig = axios.create({
    baseURL: 'http://localhost:5000'
})

export default axiosConfig