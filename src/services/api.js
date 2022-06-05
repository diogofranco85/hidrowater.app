import axios from 'axios';

const api = axios.create({
    // baseURL: 'https://hydrowater.hypeti.com.br/api'
    baseURL: 'http://192.168.88.10:3333/api'
    // baseURL: 'http://192.168.88.20:3333/api'
});

export default api;