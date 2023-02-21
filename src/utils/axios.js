import axios from 'axios' // 引入axios

const instance = axios.create({
    baseURL: import.meta.env.DEV ? '/mr/api/plugins/xx' : '/api/plugins/xx',
    timeout: 60000
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器
instance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    return Promise.reject(error)
})

// get请求
export function get(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, {
                params: data,
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('accessToken')
                }
            })
            .then((response) => {
                resolve(response.data)
            })
            .catch((err) => {
                let serverError = {
                    code: 500,
                    msg: '服务器异常',
                    data: null
                }
                resolve(serverError)
            })
    })
}

// post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        instance.post(url, data, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('accessToken')

            }
        }).then(
            (response) => {
                resolve(response.data)
            },
            (err) => {
                reject(err)
            }
        )
    })
}
