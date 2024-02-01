import request from "@/config/axios"

//获取歌手列表
export const getsinger = () => {
    return request({
        url: "/node/music/singer/get",
        method:"get"
    })
}

//上传歌手头像
export const uploadsinger = (formData) => {
    return request({
        url: "/node/music/singer/upload",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

//获取歌手标签下拉
export const getsingerlabel = () => {
    return request({
        url: "/node/music/singer/select",
        method: "get"
    })
}

//添加歌手信息
export const addsinger = (params) => {
    return request({
        url: "/node/music/singer/add",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//修改歌手信息
export const editsinger = (params,id) => {
    return request({
        url: "/node/music/singer/edit/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//删除歌手信息
export const deletesinger = (id_group) => {
        return request({
        url: "/node/music/singer/delete",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}