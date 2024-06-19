import request from '@/plugins/axios'

/* 获取字段列表 */
export const getFieldList = tid => {
    return request({
        url: '/getFieldList/?tid=' + tid,
        method: 'get',
    })
}

/* 获取关联表信息 */
export const getSelectTable = (wid, tid) => {
    return request({
        url: '/getSelectTable/?wid=' + wid + '&tid=' + tid,
        method: 'get',
    })
}

/* 获取关联字段信息 */
export const getSelectField = tid => {
    return request({
        url: '/getSelectField/?tid=' + tid,
        method: 'get',
    })
}

/* 添加字段信息 */
export const addFieldInfo = param => {
    return request({
        url: '/addFieldInfo',
        method: 'post',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param,
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
export const editFieldInfo = (id, param) => {
    return request({
        url: '/editFieldInfo/?id=' + id,
        method: 'put',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param,
    })
}

/* 删除字段信息 */
export const removeFieldInfo = (id, tid, wid) => {
    return request({
        url: '/removeFieldInfo/?id=' + id + '&tid=' + tid + '&wid=' + wid,
        method: 'delete',
    })
}
