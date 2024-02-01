// 引入表单校验模块
const Joi = require('joi')

/**
 *  @constant {用户管理api表单校验}
 *? add_filtrate-----添加类别表单校验规则
 *? edit_filtrate-----修改类别表单修改规则
 *? add_label-----添加标签表单校验规则
 *? edit_label-----修改标签表单修改规则
 */
exports.add_filtrate = Joi.object({
    id:Joi.string().length(3).required(),
    name:Joi.string().required().error(new Error('输入框不能为空')),
    creat_time:Joi.string().max(45).required(),
})
exports.edit_filtrate = Joi.object({
    name:Joi.string().required().error(new Error('输入框不能为空')),
})
exports.add_label = Joi.object({
    id:Joi.string().length(6).required(),
    p_id:Joi.string().length(3).required(),
    name:Joi.string().required().error(new Error('输入框不能为空')),
    creat_time:Joi.string().max(45).required(),
})
exports.edit_label = Joi.object({
    name:Joi.string().required().error(new Error('输入框不能为空')),
})
