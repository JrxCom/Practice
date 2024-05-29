import request from '@/plugins/axios'

export const getWebList = () => {
    return request({
        url: '/getWebList',
        method: 'get',
    })
}

export const addWebInfo = param => {
    return request({
        url: '/addWebInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const getWebInfo = id => {
    return request({
        url: '/getWebInfo/?id=' + id,
        method: 'get',
    })
}

export const editWebInfo = (id,param) => {
    return request({
        url: '/editWebInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const removeWebInfo = id => {
    return request({
        url: '/removeWebInfo/?id=' + id,
        method: 'delete',
    })
}
