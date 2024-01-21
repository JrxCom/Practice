import request from "@/config/axios"

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

export const get_info = () =>{
    return request({
        url:"/getinfo",
        method:"get"
    })
}


export const logout = () =>{
    return request({
        url:"/logout",
        method:"post"
    })
}