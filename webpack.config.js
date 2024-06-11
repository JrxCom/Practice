const path = require('path');
module.exports = {
    target: "node",
    mode: 'production',//development、production   这里是说webpack打包的结果是哪种，选production会进行极致压缩获得低存储大小同时使代码失去可读性
    entry: {
        app: path.resolve(__dirname, "./src/main.js"),
    },
    output: {
        path: path.resolve(__dirname, './dist'),  //出口路径
        filename: "src/index.js",
    },
    module: {
        rules: [
            {
                test: /\.(ttf|eot|woff2?)$/, // 匹配各种字体文件
                type: 'asset/resource',
                generator: {
                  filename: 'font/[name]' // 指定打包后文件存放的文件夹和文件名
                }
            },
        ]
    }

};
