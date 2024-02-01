import request from "@/config/axios"

//获取歌曲列表
export const getsong = () => {
    return request({
        url: "/node/music/song/get",
        method:"get"
    })
}

//获取歌手信息下拉
export const selectsinger = () => {
    return request({
        url: "/node/music/song/select",
        method:"get"
    })
}

//上传歌曲
export const uploadsong = (formData) => {
    return request({
        url: "/node/music/song/uploadsong",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

//上传歌词
export const uploadlyric = (formData) => {
    return request({
        url: "/node/music/song/uploadlyric",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

//添加歌曲信息
export const addsong = (params) => {
    return request({
        url: "/node/music/song/add",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//修改歌曲信息
export const editsong = (params,id) => {
    return request({
        url: "/node/music/song/edit/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//删除歌曲信息
export const deletesong = (id_group) => {
        return request({
        url: "/node/music/song/delete",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}