import request from "@/config/axios"

//获取类别列表
export const getfiltrate = () => {
    return request({
        url: "/node/music/filtrate/get",
        method:"get"
    })
}

//添加类别信息
export const addfiltrate = (params) => {
    return request({
        url: "/node/music/filtrate/add",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//修改类别信息
export const editfiltrate = (params,id) => {
    return request({
        url: "/node/music/filtrate/edit/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//删除类别信息
export const deletefiltrate = (id_group) => {
        return request({
        url: "/node/music/filtrate/delete",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}
