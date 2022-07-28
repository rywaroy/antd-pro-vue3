import { message } from 'ant-design-vue';
import axios from 'axios';

const service = axios.create({
    withCredentials: true,
    baseURL: '/',
    timeout: 15000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
    (config) => {
        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            config.headers['Content-Type'] = 'application/json';
            // 序列化
            config.data = JSON.stringify(config.data);
            if (config.type === 'form') {
                config.headers['Content-Type'] = 'multipart/form-data';
            }
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// respone拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        return res;
    },
    (error) => Promise.reject({
        type: 'error',
        data: error,
    }),
);

export default service;
