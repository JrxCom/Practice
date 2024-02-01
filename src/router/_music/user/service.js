//引入表单校验模块
const Joi = require('joi')

/**
 *  @constant {用户管理api表单校验}
 *? add_user-----添加用户信息表单校验规则
 *? edit_user-----修改用户信息表单校验规则
 */
exports.add_user = Joi.object({
    u_id:Joi.string().length(9).required(),
    name:Joi.string().required().error(new Error('用户名不能为空')),
    age:Joi.string().max(3),
    sex:Joi.string().min(1).max(1).required().error(new Error('请选择性别')),
    address:Joi.allow(null),
    phone:Joi.string().min(11).max(11).pattern(new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)).error(new Error('手机号格式错误')),
    emil:Joi.string().pattern(new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)).error(new Error('邮箱格式错误')),
    photo:Joi.allow(null),
    state:Joi.string().min(1).max(1),
    creat_time:Joi.string().max(45).required(),
    login_time:Joi.allow(null)
})
exports.edit_user = Joi.object({
    name:Joi.string().required().error(new Error('用户名不能为空')),
    age:Joi.string().max(3),
    sex:Joi.string().min(1).max(1).required().error(new Error('请选择性别')),
    address:Joi.string(),
    phone:Joi.string().min(11).max(11).pattern(new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/)).error(new Error('手机号格式错误')),
    emil:Joi.string().pattern(new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)).error(new Error('邮箱格式错误')),
    photo:Joi.allow(null),
    state:Joi.string().min(1).max(1)
})


