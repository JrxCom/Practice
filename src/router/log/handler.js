/* 引入数据库连接 */
const db = require('../../db/db')
/* 引入验证码生成模块 */
const svgCaptcha = require('svg-captcha')

/* 获取验证码 */
exports.getCode = (req, res) => {
    const img = svgCaptcha.create({
        size: 4,
        ignoreChars: "0o1iIl",
        noise: 2,
        color: true,
        background: "#808b96",
        fontSize: 60
    })
    req.session.code = img.text
    console.log(req.session.code);
    res.type("svg")
    res.send(img.data)
}

/* 登录 */
exports.login = (req, res) => {
    const is_user = new Promise((resolve, reject) => {
        db.query(`SELECT * FROM learner.user WHERE username = '${req.body.user}' AND password = '${req.body.password}'`, (err, results) => {
            if (results.length > 0) {
                resolve()
            } else {
                reject('账号或密码输入错误，请重新输入!');
            }
        })
    });
    const is_code = new Promise((resolve, reject) => {
        if (req.session.code === req.body.code) {
            resolve()
        } else {
            reject('验证码输入错误!');
        }
    });
    Promise.all([is_user, is_code]).then(() => {
        res.cookie("user", req.body.user, { maxAge: 1000 * 1000 })
        res.send({ status: 200, message: '登录成功。' })
    }).catch(err => {
        res.send({ status: 500, message: err })
    })
}

/* 退出 */
exports.logout = (req, res) => {
    if (req.cookies.user === undefined) return res.send({ status: 500, message: "登录失效，请重新登录!" })
    res.cookie("user", req.cookies.user, { maxAge: 1 * 1000 })
    res.send({ status: 200, message: '退出成功。' })
}
