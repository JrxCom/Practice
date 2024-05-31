import request from '@/plugins/axios'

/* 上传 */
export const upload = (param, wid, tid) => {
    return request({
        url: '/upload/?wid=' + wid + '&tid=' + tid,
        method: 'post',
        headers:'Content-Type: multipart/form-data',
        data: param,
    })
}
