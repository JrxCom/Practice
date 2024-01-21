import request from "@/config/axios"

export const getsinger = () => {
    return request({
        url: "/getsinger",
        method:"get"
    })
}
export const uploadsinger = (formData) => {
    return request({
        url: "/uploadsinger",
        method: "post",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData
    })
}

export const addsinger = (params) => {
    return request({
        url: "/addsinger",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const editsinger = (params,id) => {
    return request({
        url: "/editsinger/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const deletesinger = (id_group) => {
        return request({
        url: "/deletesinger",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}