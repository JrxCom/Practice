import request from "@/config/axios"

export const getuser = () => {
    return request({
        url: "/getmuser",
        method:"get"
    })
}

export const adduser = (params) => {
    return request({
        url: "/addmuser",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const edituser = (params,id) => {
    return request({
        url: "/editmuser/?u_id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

export const deleteuser = (id_group) => {
        return request({
        url: "/deletemuser",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}

export const banuser = (params,id) =>{
    return request({
        url: "/banmuser/?u_id=" + id,
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
})
}