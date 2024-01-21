import request from "@/config/axios"

export const addlabel = (params, pid) => {
    return request({
        url: "/addmlabel/?pid=" + pid,
        method: "post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
}

export const editlabel = (params, id) => {
    return request({
        url: "/editmlabel/?id=" + id,
        method: "put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: params
    })
}

export const deletelabel = (id) => {
    return request({
        url: "/deletemlabel?id=" + id,
        method: "delete"
    })
}
