import request from '@/plugins/axios'

export const getFieldList = tid => {
    return request({
        url: '/getFieldList/?tid=' + tid,
        method: 'get',
    })
}

export const addFieldInfo = param => {
    return request({
        url: '/addFieldInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const getFieldInfo = id => {
    return request({
        url: '/getFieldInfo/?id=' + id,
        method: 'get',
    })
}

export const editFieldInfo = (id,param) => {
    return request({
        url: '/editFieldInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

export const removeFieldInfo = id => {
    return request({
        url: '/removeFieldInfo/?id=' + id,
        method: 'delete',
    })
}
