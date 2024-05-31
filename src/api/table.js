import request from '@/plugins/axios'

/* 获取表列表 */
export const getTableList = wid => {
    return request({
        url: '/getTableList/?wid=' + wid,
        method: 'get',
    })
}

/* 添加表信息 */
export const addTableInfo = param => {
    return request({
        url: '/addTableInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 获取表信息 */
export const getTableInfo = id => {
    return request({
        url: '/getTableInfo/?id=' + id,
        method: 'get',
    })
}

/* 修改表信息 */
export const editTableInfo = (id,param) => {
    return request({
        url: '/editTableInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 删除表信息 */
export const removeTableInfo = (id,wid) => {
    return request({
        url: '/removeTableInfo/?id=' + id + '&wid=' + wid,
        method: 'delete',
    })
}
