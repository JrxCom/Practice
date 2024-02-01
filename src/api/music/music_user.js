import request from "@/config/axios"

//获取用户列表
export const getuser = () => {
    return request({
        url: "/node/music/user/get",
        method:"get"
    })
}

//添加用户信息
export const adduser = (params) => {
    return request({
        url: "/node/music/user/add",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//修改用户信息
export const edituser = (params,id) => {
    return request({
        url: "/node/music/user/edit/?u_id=" + id,
        method:"put",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//删除用户信息
export const deleteuser = (id_group) => {
        return request({
        url: "/node/music/user/delete",
        method:"delete",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:id_group
    })
}

//禁用用户
export const banuser = (params,id) =>{
    return request({
        url: "/node/music/user/ban/?u_id=" + id,
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
})
}