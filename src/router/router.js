// 引入app文件路由路由模块
const {router} = require('../app/app')
// 管理相关api路径、方法
const _Path = require('./_/path')
const _Handler = require('./_/handler')
// 音乐web管理相关api路径、方法
const M_Path = require('./_music/path')
const M_Handler = require('./_music/handler')

/**
 * @method (管理员相关api集合)
 */
// 登录
router.post(_Path.login,_Handler.login)
// 退出登录
router.post(_Path.logout,_Handler.logout)
// 获取用户信息
router.get(_Path.getinfo,_Handler.getinfo)
/**
 * @method (音乐web管理相关api)
 */
//?用户相关
//*获取用户信息
router.get(M_Path.getUser,M_Handler.getUser)
//*添加用户
router.post(M_Path.addUser,M_Handler.addUser)
//*修改用户
router.put(M_Path.editUser,M_Handler.editUser)
//*删除用户
router.delete(M_Path.deleteUser,M_Handler.deleteUser)
//*禁用用户
router.post(M_Path.banUser,M_Handler.banUser)
//?标签相关
//*获取父标签
router.get(M_Path.getFiltrate,M_Handler.getFiltrate)
//*添加父标签
router.post(M_Path.addFiltrate,M_Handler.addFiltrate)
//*修改父标签
router.put(M_Path.editFiltrate,M_Handler.editFiltrate)
//*删除父标签
router.delete(M_Path.deleteFiltrate,M_Handler.deleteFiltrate)
////获取子标签
router.get(M_Path.getLabel,M_Handler.getLabel)
//*添加子标签
router.post(M_Path.addLabel,M_Handler.addLabel)
//*修改子标签
router.put(M_Path.editLabel,M_Handler.editLabel)
//*删除子标签
router.delete(M_Path.deleteLabel,M_Handler.deleteLabel)
//?歌曲相关
//*上传歌曲
router.post(M_Path.uploadSong,M_Handler.uploadSong)
//*上传歌词
router.post(M_Path.uploadLyric,M_Handler.uploadLyric)
//*添加歌曲
router.post(M_Path.addSong,M_Handler.addSong)
//*修改歌曲
router.put(M_Path.editSong,M_Handler.editSong)
//*删除歌曲
router.delete(M_Path.deleteSong,M_Handler.deleteSong)
//?歌手相关
//*获取歌手
router.get(M_Path.getSinger,M_Handler.getSinger)
//*上传歌手头像
router.post(M_Path.uploadSinger,M_Handler.uploadSinger)
//*添加歌手
router.post(M_Path.addSinger,M_Handler.addSinger)
//*修改歌手
router.post(M_Path.editSinger,M_Handler.editSinger)
//*删除歌手
router.post(M_Path.deleteSinger,M_Handler.deleteSinger)

// 共享路由
module.exports = router
