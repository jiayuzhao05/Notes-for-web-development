import axios from 'axios'

const request = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

request.interceptors.request.use(
    (config) => {
        //拦截到请求后可以做其他事 一般是加token 从本地拿到token
        const token = localStorage.getItem('userToken');
        if(token){
            config.headers.authorization = `Bearer ${token}`;
        }
        //请求放行
        return config
    },
    (error) => Promise.reject(error)
)

request.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
)

export default request
