import request from '@/plugins/axios'

/* 获取网站列表 */
export const getWebList = () => {
    return request({
        url: '/getWebList',
        method: 'get',
    })
}

/* 添加网站信息 */
export const addWebInfo = param => {
    return request({
        url: '/addWebInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 获取网站信息 */
export const getWebInfo = id => {
    return request({
        url: '/getWebInfo/?id=' + id,
        method: 'get',
    })
}

/* 修改网站信息 */
export const editWebInfo = (id,param) => {
    return request({
        url: '/editWebInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 删除网站信息 */
export const removeWebInfo = id => {
    return request({
        url: '/removeWebInfo/?id=' + id,
        method: 'delete',
    })
}
