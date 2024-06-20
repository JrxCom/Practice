import request from '@/plugins/axios'

/* 获取数据列表 */
export const getDataList = (wid, tid, param) => {
    return request({
        url: '/getDataList/?wid=' + wid + '&tid=' + tid,
        method: 'post',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param
    })
}

/* 根据id搜索数据 */
export const getDataSearch = (wid, tid, id) => {
    return request({
        url: '/getDataSearch/?wid=' + wid + '&tid=' + tid + '&id=' + id,
        method: 'get',
    })
}

/* 添加数据信息 */
export const addDataInfo = (wid, tid, param) => {
    return request({
        url: '/addDataInfo/?wid=' + wid + '&tid=' + tid,
        method: 'post',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param,
    })
}

/* 获取数据信息 */
export const getDataInfo = (wid, tid, id) => {
    return request({
        url: '/getDataInfo/?wid=' + wid + '&tid=' + tid + '&id=' + id,
        method: 'get',
    })
}

/* 获取关联数据信息 */
export const getSelectData = (wid,tid,fid) => {
    return request({
        url: '/getSelectData/?wid=' + wid + '&tid=' + tid + '&fid=' + fid,
        method: 'get',
    })
}



/* 修改数据信息 */
export const editDataInfo = (wid, tid, id, param) => {
    return request({
        url: '/editDataInfo/?wid=' + wid + '&tid=' + tid + '&id=' + id,
        method: 'put',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param,
    })
}

/* 删除数据信息 */
export const removeDataInfo = (wid, tid, param) => {
    return request({
        url: '/removeDataInfo/?wid=' + wid + '&tid=' + tid,
        method: 'delete',
        headers: 'Content-Type: application/x-www-form-urlencoded',
        data: param
    })
}
