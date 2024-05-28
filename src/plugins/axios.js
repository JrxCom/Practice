import axios from "axios";
 
//不同环境下的地址
let baseURL = "";
baseURL = "http://localhost:8080"
//node中的环境变量process.env,也就是我们新增开发、生产的配置文件

/* if(process.env.NODE_ENV === "development"){
      //这里可在vue.config.js做一个代理【代理代码见下】
}else{
    baseURL = "123.com.cn"
} */
 
//创建axios实例
const request = axios.create({
    timeout: 5000,
    baseURL:baseURL,
    withCredentials: true
});
 
 
//请求拦截器
request.interceptors.request.use(
    //发送之前想要做些什么
    config => {
        return config;
    },
    //方法返回一个带有拒绝原因的 Promise 对象。
    error => Promise.reject(error)
);
 
//响应拦截器（对请求结束后进行一些操作，，例如:统一收集报错）
request.interceptors.response.use(
    //请求成功
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    //请求失败
    error => {
        //可根据不同的状态去区分不同的错误，达到不同效果
        if(error.response.status){
            error.response.status === 404 ? alert("请求不存在！！") : alert("其他");
        }
        return Promise.reject(error);
    }
);


 
export default request
