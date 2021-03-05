const app = getApp() 
let baseUrl = app.globalData.host ? app.globalData.host: "http://127.0.0.1:5888/qiyu"; // 接口地址
const request = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}${url}`,
            method: options.method,
            data: options.data,
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': app.globalData.accessToken
            },
            timeout: 10000,
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data)
                } else if (request.statusCode === 401) {
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                    reject(request.data)
                } else if (request.statusCode === 500) {
                    wx.showModal({
                        title: '系统错误',
                        content: request.data.errmsg,
                    })
                    reject(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
                wx.showModal({
                    title: '系统错误',
                    content: '服务器正在开小差',
                })
                reject(error.data)
            },
            complete: function (res) {}
        })
    })
}

// 把需要Loading的方法进行封装，减少不必要代码
const requestWithLoading = (url, options) => {
    return new Promise((resolve, reject) => {
        wx.showLoading({
            title: '加载中',
        })
        wx.request({
            url: `${baseUrl}${url}`,
            method: options.method,
            data: options.data,
            header: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Authorization': app.globalData.accessToken
            },
            timeout: 10000,
            success(request) {
                if (request.statusCode === 200) {
                    resolve(request.data)
                } else if (request.statusCode === 401) {
                    wx.navigateTo({
                        url: '/pages/login/login'
                    })
                    reject(request.data)
                } else if (request.statusCode === 500) {
                    wx.showModal({
                        title: '系统错误',
                        content: request.data.errmsg,
                    })
                    reject(request.data)
                } else {
                    reject(request.data)
                }
            },
            fail(error) {
                wx.showModal({
                    title: '系统错误',
                    content: '服务器正在开小差',
                })
                reject(error.data)
            },
            complete: function (res) {
                wx.hideLoading()
            }
        })
    })
}

const get = (url, options = {}) => {
    return request(url, {
        method: 'GET',
        data: options
    })
}

const getWithLoading = (url, options = {}) => {
    return requestWithLoading(url, {
        method: 'GET',
        data: options
    })
}

const post = (url, options) => {
    return request(url, {
        method: 'POST',
        data: options
    })
}

const postWithLoading = (url, options) => {
    return requestWithLoading(url, {
        method: 'POST',
        data: options
    })
}

const put = (url, options) => {
    return request(url, {
        method: 'PUT',
        data: options
    })
}

const putWithLoading = (url, options) => {
    return requestWithLoading(url, {
        method: 'PUT',
        data: options
    })
}
// 不能声明DELETE（关键字）
const remove = (url, options) => {
    return request(url, {
        method: 'DELETE',
        data: options
    })
}

const removeWithLoading = (url, options) => {
    return requestWithLoading(url, {
        method: 'DELETE',
        data: options
    })
}

module.exports = {
    get,
    getWithLoading,
    post,
    postWithLoading,
    put,
    putWithLoading,
    remove,
    removeWithLoading
}