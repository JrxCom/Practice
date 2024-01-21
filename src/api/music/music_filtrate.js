import request from "@/config/axios"

export const getfiltrate = () => {
    return request({
        url: "/getmfiltrate",
        method:"get"
    })
}

export const addfiltrate = (params) => {
    return request({
        url: "/addmfiltrate",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const editfiltrate = (params,id) => {
    return request({
        url: "/editmfiltrate/?id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const deletefiltrate = (id_group) => {
        return request({
        url: "/deletemfiltrate",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}
