import request from '@/plugins/axios'

/* 获取字段列表 */
export const getFieldList = tid => {
    return request({
        url: '/getFieldList/?tid=' + tid,
        method: 'get',
    })
}

/* 添加字段信息 */
export const addFieldInfo = param => {
    return request({
        url: '/addFieldInfo',
        method: 'post',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 获取字段信息 */
export const getFieldInfo = id => {
    return request({
        url: '/getFieldInfo/?id=' + id,
        method: 'get',
    })
}

/* 修改字段信息 */
export const editFieldInfo = (id,param) => {
    return request({
        url: '/editFieldInfo/?id=' + id,
        method: 'put',
        headers:'Content-Type: application/x-www-form-urlencoded',
        data:param,
    })
}

/* 删除字段信息 */
export const removeFieldInfo = id => {
    return request({
        url: '/removeFieldInfo/?id=' + id,
        method: 'delete',
    })
}
