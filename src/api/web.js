import request from '@/plugins/axios'

export const getWebList = () => {
    return request({
        url: '/getWebList',
        method: 'get',
    })
}
