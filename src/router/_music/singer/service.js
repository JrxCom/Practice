// 引入表单校验模块
const Joi = require('joi')

/**
 *  @constant {歌手管理api表单校验}
 *? add_singer-----添加歌手表单校验规则
 *? edit_singer-----修改歌手表单校验规则
 */
exports.add_singer = Joi.object({
    id:Joi.string().length(9).required(),
    name:Joi.string().required().error(new Error('用户名不能为空')),
    photo:Joi.allow(null),
    intro:Joi.allow(null),
    label:Joi.required(),
    birthday:Joi.allow(null),
    creat_time:Joi.string().max(45).required(),
})
exports.edit_singer = Joi.object({
    name:Joi.string().required().error(new Error('用户名不能为空')),
    photo:Joi.allow(null),
    intro:Joi.allow(null),
    label:Joi.required(),
    birthday:Joi.allow(null),
})