// 引入app文件路由路由模块
const {router} = require('../app/app')
// 管理相关api路径、方法
const _Path = require('./_/path')
const _Handler = require('./_/handler')
// 音乐web管理相关用户api路径、方法
const MusicUserPath = require('./_music/user/path')
const MusicUserHandler = require('./_music/user/handler')
// 音乐web管理相关类别api路径、方法
const MusicFiltratePath = require('./_music/filtrate/path')
const MusicFiltrateHandler = require('./_music/filtrate/handler')
// 音乐web管理相关歌手api路径、方法
const MusicSingerPath = require('./_music/singer/path')
const MusicSingerHandler = require('./_music/singer/handler')
// 音乐web管理相关歌曲api路径、方法
const MusicSongPath = require('./_music/song/path')
const MusicSongHandler = require('./_music/song/handler')

/**
 * @method (管理员相关api集合)
 */
//*登录
router.post(_Path.login,_Handler.login)
//*退出登录
router.post(_Path.logout,_Handler.logout)
//*获取用户信息
router.get(_Path.getinfo,_Handler.getinfo)
/**
 * @method (音乐web管理相关api)
 */
//?用户
//*获取用户信息
router.get(MusicUserPath.GetUser,MusicUserHandler.GetUser)
//*添加用户信息
router.post(MusicUserPath.AddUser,MusicUserHandler.AddUser)
//*修改用户信息
router.put(MusicUserPath.EditUser,MusicUserHandler.EditUser)
//*删除用户信息
router.delete(MusicUserPath.DeleteUser,MusicUserHandler.DeleteUser)
//*禁用用户信息
router.post(MusicUserPath.BanUser,MusicUserHandler.BanUser)

//?类别
//*获取类别信息
router.get(MusicFiltratePath.GetFiltrate,MusicFiltrateHandler.GetFiltrate)
//*添加类别信息
router.post(MusicFiltratePath.AddFiltrate,MusicFiltrateHandler.AddFiltrate)
//*修改类别信息
router.put(MusicFiltratePath.EditFiltrate,MusicFiltrateHandler.EditFiltrate)
//*删除类别信息
router.delete(MusicFiltratePath.DeleteFiltrate,MusicFiltrateHandler.DeleteFiltrate)
////获取标签信息
router.get(MusicFiltratePath.GetLabel,MusicFiltrateHandler.GetLabel)
//*添加标签信息
router.post(MusicFiltratePath.AddLabel,MusicFiltrateHandler.AddLabel)
//*修改标签信息
router.put(MusicFiltratePath.EditLabel,MusicFiltrateHandler.EditLabel)
//*删除标签信息
router.delete(MusicFiltratePath.DeleteLabel,MusicFiltrateHandler.DeleteLabel)

//?歌手
//*获取歌手
router.get(MusicSingerPath.GetSinger,MusicSingerHandler.GetSinger)
//*上传歌手头像
router.post(MusicSingerPath.UploadSinger,MusicSingerHandler.UploadSinger)
//*获取歌手类别
router.get(MusicSingerPath.SelectSingerLabel,MusicSingerHandler.SelectSingerLabel)
//*添加歌手
router.post(MusicSingerPath.AddSinger,MusicSingerHandler.AddSinger)
//*修改歌手
router.put(MusicSingerPath.EditSinger,MusicSingerHandler.EditSinger)
//*删除歌手
router.delete(MusicSingerPath.DeleteSinger,MusicSingerHandler.DeleteSinger)

//?歌曲
//*获取歌曲
router.get(MusicSongPath.GetSong,MusicSongHandler.GetSong)
//*获取歌手下拉
router.get(MusicSongPath.SelectSinger,MusicSongHandler.SelectSinger)
//*上传歌曲
router.post(MusicSongPath.UploadSong,MusicSongHandler.UploadSong)
//*上传歌词
router.post(MusicSongPath.UploadLyric,MusicSongHandler.UploadLyric)
//*添加歌曲
router.post(MusicSongPath.AddSong,MusicSongHandler.AddSong)
//*修改歌曲
router.put(MusicSongPath.EditSong,MusicSongHandler.EditSong)
//*删除歌曲
router.delete(MusicSongPath.DeleteSong,MusicSongHandler.DeleteSong)


// 共享路由
module.exports = router
