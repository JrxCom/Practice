import request from "@/config/axios"

export const getsong = () => {
    return request({
        url: "/getsong",
        method:"get"
    })
}

export const uploadsong = (formData) => {
    return request({
        url: "/uploadsong",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const uploadlyric = (formData) => {
    return request({
        url: "/uploadlyric",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const addsong = (params) => {
    return request({
        url: "/addsong",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const editsong = (params,id) => {
    return request({
        url: "/editsong/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const deletesong = (id_group) => {
        return request({
        url: "/deletesong",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}