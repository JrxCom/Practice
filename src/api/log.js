import request from '@/plugins/axios'

export const getCode = () => {
    return request({
        url: 'getCode',
        method: 'get',
    })
}

export const login = param => {
    return request({
        url: '/login',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}
