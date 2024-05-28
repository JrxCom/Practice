const path = require('path');

module.exports = {
    target: "node",
    mode: 'production',//development、production   这里是说webpack打包的结果是哪种，选production会进行极致压缩获得低存储大小同时使代码失去可读性
    entry: path.resolve(__dirname, "./src/main.js"),  //入口文件
    output: {
        path: path.resolve(__dirname, './dist'),  //出口路径
        filename: "index.js",  //出口文件名
    },
    externals: {
        express: 'express',
    },
};
