import request from '@/plugins/axios'

/* 获取验证码 */
export const getCode = () => {
    return request({
        url: '/getCode',
        method: 'get',
    })
}

/* 登录 */
export const login = param => {
    return request({
        url: '/login',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 退出 */
export const logout = () => {
    return request({
        url: '/logout',
        method: 'get',
    })
}
