/* 1.引入文件 */
import axios from 'axios'        
import qs from 'qs' 

/* 2.全局默认配置 */
let baseURL = 'http://127.0.0.1/'

// 配置axios的属性
axios.defaults.timeout = 6000;    // 请求超时时间1分钟                  
axios.defaults.baseURL = baseURL; // 你的接口地址 
axios.defaults.responseType = "json";
axios.defaults.withCredentials = false;  //是否允许带cookie这些

const request = axios.create({
        baseURL: baseURL, 		      // 后台服务地址
        timeout: 60000, 		      // 请求超时时间1分钟
        responseType: "json",
        withCredentials: false    // 是否允许带cookie这些
});

/* 3.设置拦截器 */
request.interceptors.request.use(config => {
    //发送请求前进行拦截
    //  可在此处配置请求头信息
    config.headers["appkey"] = "";
    config.headers["token"] = "";
    config.headers["Authorization"] = 'Bearer ' + document.cookie.slice(13);
    // if (config.method == "post") {
    //     config.data = qs.stringify(config.data)
    // }
    return config;
}, error => {
    return Promise.reject(error)
})
request.interceptors.response.use(res => {
    //请求响应后拦截
    if (res.status == 200) {                     
        //alert("提交成功")
        return Promise.resolve(res)
    }
    return res;
}, error => {
    return Promise.reject(error)
})
export default request 