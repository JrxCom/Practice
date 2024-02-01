// 引入表单校验模块
const Joi = require('joi')

/**
 *  @constant {歌曲管理api表单校验}
 *? add_song-----添加歌曲表单校验规则
 *? edit_song-----修改歌手表单校验规则
 */
exports.add_song = Joi.object({
    id:Joi.string().length(9).required(),
    name:Joi.string().required().error(new Error('歌曲名称不能为空')),
    s_id:Joi.string().length(9).required(),
    singer:Joi.required(),
    lyric_path:Joi.allow(null),
    song_path:Joi.required(),
    duration:Joi.required(),
    creat_time:Joi.string().max(45).required(),
})
exports.edit_song = Joi.object({
    name:Joi.string().required().error(new Error('歌曲名称不能为空')),
    s_id:Joi.string().length(9).required(),
    singer:Joi.required(),
    lyric_path:Joi.allow(null),
    song_path:Joi.required(),
    duration:Joi.required(),
})


