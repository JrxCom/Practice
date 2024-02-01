import request from "@/config/axios"


//登录
export const login = (params) => {
    return request({
        url: "/login",
        method:"post",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:params
    })
}

//获取用户信息
export const get_info = () =>{
    return request({
        url:"/getinfo",
        method:"get"
    })
}

//退出
export const logout = () =>{
    return request({
        url:"/logout",
        method:"post"
    })
}