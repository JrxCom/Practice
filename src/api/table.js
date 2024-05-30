import request from '@/plugins/axios'

export const getTableList = wid => {
    return request({
        url: '/getTableList/?wid=' + wid,
        method: 'get',
    })
}

export const addTableInfo = param => {
    return request({
        url: '/addTableInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const getTableInfo = id => {
    return request({
        url: '/getTableInfo/?id=' + id,
        method: 'get',
    })
}

export const editTableInfo = (id,param) => {
    return request({
        url: '/editTableInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const removeTableInfo = id => {
    return request({
        url: '/removeTableInfo/?id=' + id,
        method: 'delete',
    })
}
