import fly from 'flyio'

//请求拦截
fly.interceptors.request.use(request => {
    return request
}, error => {
    return Promise.reject(error.response)
});
//响应拦截
fly.interceptors.response.use(response => {
    return response.data
}, error => {
    return Promise.resolve(error.response)
});

export default {
    get(url, obj) {
        return new Promise((resolve, reject) => {
            fly.request({
                method: "get",
                url: url,
                body: obj || {}
            }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    },
    post(url, obj) {
        return new Promise((resolve, reject) => {
            fly.request({
                method: "post",
                url: url,
                body: obj || {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
}