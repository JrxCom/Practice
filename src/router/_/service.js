// 引入表单校验模块
const Joi = require('joi')

// 登录表单校验规则
exports.login = Joi.object({
    u_id:Joi.string().required().error(new Error('账号不能为空')),
    password:Joi.string().required().error(new Error('密码不能为空'))   
})

// const rules = Joi.object({
//     id:Joi.string().min(1).required(),
//     password:Joi.string().min(6).max(12).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
// })
