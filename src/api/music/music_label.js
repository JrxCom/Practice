import request from "@/config/axios"

//添加标签信息
export const addlabel = (params, pid) => {
    return request({
        url: "/node/music/label/add/?pid=" + pid,
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
}

//修改标签信息
export const editlabel = (params, id) => {
    return request({
        url: "/node/music/label/edit/?id=" + id,
        method: "put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
}

//删除标签信息
export const deletelabel = (id) => {
    return request({
        url: "/node/music/label/delete?id=" + id,
        method: "delete"
    })
}
