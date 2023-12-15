<template>
  <div class="music_group">
    <vs-navbar square color='#F4F7F8' center-collapsed v-model="menucode">
      <vs-navbar-item :active="menucode == 'filtrate'" id="filtrate" @click='menucode = "filtrate"'>
        标签管理
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'song'" id="song" @click='menucode = "song"'>
        单曲
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'singer'" id="singer" @click='menucode == "singer"'>
        歌手
      </vs-navbar-item>
    </vs-navbar>
    <div class="content">
      <div class="filtrate" v-show="menucode === 'filtrate'">
        <vs-alert>
          <template #icon>
            <i class='bx bx-filter'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button relief @click="filtrate.dialog_add_edit = true">
            <i class='bx bxs-message-alt-add'></i>添加歌单类别
          </vs-button>
          <vs-button success relief @click="filtrate.dialog_add_edit = true">
            <i class='bx bxs-message-alt-edit'></i>修改歌单类别
          </vs-button>
          <vs-button danger relief @click="filtrate.dialog_remove = true">
            <i class='bx bxs-message-alt-x'></i>删除歌单类别
          </vs-button>
        </div>
        <div class="table">
          <vs-table v-model="filtrate.selected">
            <template #header>
              <vs-input v-model="filtrate.search" border placeholder="Search" />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th>
                  <vs-checkbox :indeterminate="filtrate.selected.length == filtrate.data.length" v-model="song.allCheck"
                    @change="filtrate.selected = $vs.checkAll(filtrate.selected, filtrate.data)" />
                </vs-th>
                <vs-th>
                  <div style="display: flex;align-items: center;">
                    <p>标签名称</p>
                    <vs-button icon @click="filtrate.dialog_add_edit_child = true">
                      <i class='bx bx-add-to-queue'></i>
                    </vs-button>
                  </div>
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i"
                v-for="(tr, i) in $vs.getPage($vs.getSearch(filtrate.data, filtrate.search), filtrate.page, filtrate.max)"
                :data="tr" :is-selected="!!filtrate.selected.includes(tr)" not-click-selected open-expand-only-td>
                <vs-td checkbox>
                  <vs-checkbox :val="tr" v-model="filtrate.selected" />
                </vs-td>
                <vs-td>
                  {{ tr.name }}
                </vs-td>
                <template #expand>
                  <div class="con-content">
                    <div style="display: flex;align-items: center;">
                      <div
                        style="width: 100px;background-color: #195BFF;color: #FFF;border-radius: 10px;padding: 8px 16px;display: flex;align-items: center;justify-content: space-between;">
                        <p>Vue</p>
                        <div>
                          <i class='bx bxs-edit' style="color: #FFF;font-size: 20px;"></i>
                          <i class='bx bxs-x-square' style="color: #FFF;font-size: 20px;"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </vs-tr>
            </template>

            <template #footer>
              <vs-pagination v-model="filtrate.page"
                :length="$vs.getLength($vs.getSearch(filtrate.data, filtrate.search), filtrate.max)" />
            </template>
          </vs-table>
        </div>

        <vs-dialog blur v-model="filtrate.dialog_add_edit" not-center prevent-close auto-width>
          <template #header>
            <h4 class="not-margin">
              <b>添加标签</b>
            </h4>
          </template>
          <div class="con-form">
            <!-- 标签名称 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-box" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="filtrate.parent" placeholder="标签名称">
              </vs-input>
            </div>
          </div>
          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

        <vs-dialog blur v-model="filtrate.dialog_remove" not-center prevent-close>
          <template #header>
            <h4 class="not-margin">
              <b>确认删除标签</b>
            </h4>
          </template>

          <div class="con-form">
            <div class="message">
              <p>删除标签将无法找回!</p>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

        <vs-dialog blur v-model="filtrate.dialog_add_edit_child" not-center prevent-close auto-width>
          <template #header>
            <h4 class="not-margin">
              <b>添加子标签</b>
            </h4>
          </template>

          <div class="con-form">
            <!-- 子标签名称 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-file-blank" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="filtrate.child" placeholder="子标签名称">
              </vs-input>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

        <vs-dialog blur v-model="filtrate.dialog_remove_child" not-center prevent-close>
          <template #header>
            <h4 class="not-margin">
              <b>确认删除子标签</b>
            </h4>
          </template>

          <div class="con-form">
            <div class="message">
              <p>删除子标签将无法找回!</p>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

      </div>

      <div class="song" v-show="menucode === 'song'">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-playlist'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button relief @click="song.dialog_add_edit = true">
            <i class='bx bxs-message-alt-add'></i>添加歌曲
          </vs-button>
          <vs-button success relief @click="song.dialog_add_edit = true">
            <i class='bx bxs-message-alt-edit'></i>修改歌曲信息
          </vs-button>
          <vs-button danger relief @click="song.dialog_remove = true">
            <i class='bx bxs-message-alt-x'></i>删除歌曲
          </vs-button>
        </div>
        <div class="table">
          <vs-table v-model="song.selected">
            <template #header>
              <vs-input v-model="song.search" border placeholder="Search" />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th>
                  <vs-checkbox :indeterminate="song.selected.length == song.data.length" v-model="song.allCheck"
                    @change="song.selected = $vs.checkAll(song.selected, song.data)" />
                </vs-th>
                <vs-th>
                  歌曲Id
                </vs-th>
                <vs-th>
                  歌曲名称
                </vs-th>
                <vs-th>
                  歌手
                </vs-th>
                <vs-th>
                  发行时间
                </vs-th>
                <vs-th>
                  时长
                </vs-th>
                <vs-th>
                  歌词
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i" v-for="(tr, i) in $vs.getPage($vs.getSearch(song.data, song.search), song.page, song.max)"
                :data="tr" :is-selected="!!song.selected.includes(tr)" not-click-selected open-expand-only-td>
                <vs-td checkbox>
                  <vs-checkbox :val="tr" v-model="song.selected" />
                </vs-td>
                <vs-td>
                  {{ tr.s_id }}
                </vs-td>
                <vs-td>
                  {{ tr.s_name }}
                </vs-td>
                <vs-td>
                  {{ tr.s_singer }}
                </vs-td>
                <vs-td>
                  {{ tr.s_time }}
                </vs-td>
                <vs-td>
                  {{ tr.s_creatime }}
                </vs-td>
                <vs-td>
                  <vs-avatar v-if="tr.s_lyric">
                    <i class='bx bxs-checkbox-checked'></i>
                  </vs-avatar>
                  <vs-avatar v-else>
                    <i class='bx bxs-x-square'></i>
                  </vs-avatar>
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination v-model="song.page"
                :length="$vs.getLength($vs.getSearch(song.data, song.search), song.max)" />
            </template>
          </vs-table>
        </div>


        <vs-dialog blur v-model="song.dialog_add_edit" not-center prevent-close auto-width>
          <template #header>
            <h4 class="not-margin">
              <b>添加歌曲</b>
            </h4>
          </template>

          <div class="con-form">
            <!-- 歌曲名称 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bx-paint" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="song.form.name" placeholder="歌曲名称">
              </vs-input>
            </div>

            <!-- 歌手 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-user-circle" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="song.form.singer" placeholder="歌手">
              </vs-input>
            </div>

            <!-- 歌曲上传 -->
            <vs-button block dark border animation-type="vertical">
              歌曲上传
              <template #animate>
                <i class='bx bx-cloud-upload'></i>
              </template>
            </vs-button>

            <!-- 歌词上传 -->
            <vs-button block dark border animation-type="vertical">
              歌词上传
              <template #animate>
                <i class='bx bx-file'></i>
              </template>
            </vs-button>

          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

        <vs-dialog blur v-model="song.dialog_remove" not-center prevent-close>
          <template #header>
            <h4 class="not-margin">
              <b>确认删除歌曲</b>
            </h4>
          </template>

          <div class="con-form">
            <div class="message">
              <p>删除歌曲将无法找回!</p>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>

      <div class="singer" v-show="menucode === 'singer'">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-user-detail'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button relief @click="singer.dialog_add_edit = true">
            <i class='bx bxs-user'></i>添加歌手
          </vs-button>
          <vs-button success relief>
            <i class='bx bxs-message-alt-edit'></i>修改歌手信息
          </vs-button>
          <vs-button danger relief @click="singer.dialog_remove = true">
            <i class='bx bxs-message-alt-x'></i>删除歌手
          </vs-button>

        </div>
        <div class="table">
          <vs-table v-model="singer.selected">
            <template #header>
              <vs-input v-model="singer.search" border placeholder="Search" />
            </template>
            <template #thead>
              <vs-tr>
                <vs-th>
                  <vs-checkbox :indeterminate="singer.selected.length == singer.data.length" v-model="singer.allCheck"
                    @change="singer.selected = $vs.checkAll(singer.selected, singer.data)" />
                </vs-th>
                <vs-th>
                  歌手Id
                </vs-th>
                <vs-th>
                  姓名
                </vs-th>
                <vs-th>
                  头像
                </vs-th>
                <vs-th>
                  性别
                </vs-th>
                <vs-th>
                  简介
                </vs-th>
                <vs-th>
                  国籍
                </vs-th>
                <vs-th>
                  歌手标签
                </vs-th>
                <vs-th>
                  生日
                </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i"
                v-for="(tr, i) in $vs.getPage($vs.getSearch(singer.data, singer.search), singer.page, singer.max)"
                :data="tr" :is-selected="!!singer.selected.includes(tr)" not-click-selected open-expand-only-td>
                <vs-td checkbox>
                  <vs-checkbox :val="tr" v-model="singer.selected" />
                </vs-td>
                <vs-td>
                  {{ tr.id }}
                </vs-td>
                <vs-td>
                  {{ tr.name }}
                </vs-td>
                <vs-td>
                  {{ tr.header }}
                </vs-td>
                <vs-td>
                  <i class='bx bx-male-sign' v-if="tr.sex === 1"></i>
                  <i class='bx bx-female-sign' v-else></i>
                </vs-td>
                <vs-td>
                  <vs-avatar v-if="tr.intro != ''" @click=" singer.intro = tr.intro, singer.dialog_intro = true">
                    <i class='bx bx-receipt'></i>
                  </vs-avatar>
                  <vs-avatar v-else>
                    <i class='bx bx-task-x'></i>
                  </vs-avatar>
                </vs-td>
                <vs-td>
                  {{ tr.country }}
                </vs-td>
                <vs-td>
                  {{ tr.label }}
                </vs-td>
                <vs-td>
                  {{ tr.birthday }}
                </vs-td>
              </vs-tr>
            </template>
            <template #footer>
              <vs-pagination v-model="singer.page"
                :length="$vs.getLength($vs.getSearch(singer.data, singer.search), singer.max)" />
            </template>
          </vs-table>
        </div>

        <vs-dialog v-model="singer.dialog_intro">
          <template #header>
            歌手简介
          </template>

          <div class="con-form">
            <div class="text">
              <p>{{singer.intro}}</p>
            </div>
          </div>
        </vs-dialog>

        <vs-dialog blur v-model="singer.dialog_add_edit" not-center prevent-close auto-width>
          <template #header>
            <h4 class="not-margin">
              <b>添加歌手</b>
            </h4>
          </template>

          <div class="con-form">
            <!-- 姓名 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-user-pin" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="singer.form.name" placeholder="姓名">
              </vs-input>
            </div>

            <!-- 头像上传 -->
            <vs-button block dark border animation-type="vertical">
              头像上传
              <template #animate>
                <i class='bx bx-image'></i>
              </template>
            </vs-button>

            <!-- 歌手性别 -->
            <div class="form-list" style="margin: 6px 0;">
              <vs-avatar size="34">
                <i class="bx bx-male-female" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-select placeholder="性别" v-model="singer.form.sex">
                <vs-option label="男" value="1">
                  男
                </vs-option>
                <vs-option label="女" value="2">
                  女
                </vs-option>
              </vs-select>
            </div>

            <!-- 简介 -->
            <div class="form-list" style="margin: 10px 0;">
              <vs-avatar size="34">
                <i class="bx bxs-receipt" style="font-size: 16px"></i>
              </vs-avatar>
              <textarea v-model="singer.form.intor" placeholder="简介" class="vs-textarea" cols="37" rows="6 "></textarea>
            </div>

            <!-- 国籍 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-flag" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input v-model="singer.form.country" placeholder="国籍">
              </vs-input>
            </div>

            <!-- 歌手类型 -->
            <div class="form-list" style="margin: 6px 0;">
              <vs-avatar size="34">
                <i class="bx bxs-label" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-select placeholder="歌手类型" v-model="singer.form.sex">
                <vs-option label="男歌手" value="男歌手">
                  男歌手
                </vs-option>
                <vs-option label="女歌手" value="女歌手">
                  女歌手
                </vs-option>
              </vs-select>
            </div>

            <!-- 生日 -->
            <div class="form-list">
              <vs-avatar size="34">
                <i class="bx bxs-cake" style="font-size: 16px"></i>
              </vs-avatar>
              <vs-input type="date" v-model="singer.form.birthday" placeholder="生日">
              </vs-input>
            </div>


          </div>
          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>

        <vs-dialog blur v-model="singer.dialog_remove" not-center prevent-close>
          <template #header>
            <h4 class="not-margin">
              <b>确认删除歌手信息</b>
            </h4>
          </template>

          <div class="con-form">
            <div class="message">
              <p>删除歌手将无法找回!</p>
            </div>
          </div>

          <template #footer>
            <div class="footer-dialog">
              <vs-button>
                确认
              </vs-button>
              <vs-button border dark>
                取消
              </vs-button>
            </div>
          </template>
        </vs-dialog>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'group',
  data() {
    return {
      editActive: false,
      edit: null,
      editProp: {},
      menucode: 'filtrate',
      filtrate: {
        search: '',
        allCheck: false,
        page: 1,
        max: 7,
        selected: [],
        data: [
          {
            "name": "Leanne Graham",
          },
          {
            "name": "Ervin Howell",
          },
          {
            "name": "Leanne Graham",
          }
        ],
        dialog_add_edit: false,
        dialog_remove: false,
        parent: '',
        dialog_add_edit_child: false,
        dialog_remove_child: false,
        child: '',
      },
      song: {
        search: '',
        allCheck: false,
        page: 1,
        max: 7,
        selected: [],
        data: [
          {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": false,
          },
          {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": false,
          }, {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": false,
          }, {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_creatime": '2023-16-09',
            "s_lyric": false,
          }
        ],
        form: {
          name: '',
          singer: '',
        },
        dialog_add_edit: false,
        dialog_remove: false,
        form_add_edit: {

        },
      },
      singer: {
        search: '',
        allCheck: false,
        page: 1,
        max: 7,
        selected: [],
        data: [
          { id: 12313123, name: 'jj', header: '', sex: 1, intro: 'dddawdadas', country: '中国', label: '男歌手', birthday: '1233-12-33' }
        ],
        dialog_add_edit: false,
        dialog_remove: false,
        dialog_intro: false,
        intro: '',
        form: {
          name: '',
          sex: '',
          intor: '',
          country: '',
          label: '',
          birthday: ''
        }
      },
    }
  },
  methods: {
  }

}

</script>
  
<style lang='less' scoped>
@font-face {
  font-family: "show_date";
  src: url("../../../font/ShowDate.otf");
}

.music_group {
  .content {
    padding: 20px;
    overflow: auto;
    height: 82vh;

    .btns {
      margin: 10px 0;
      display: flex;
      flex-direction: row;
      align-items: center;

      div {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0;
      }

    }

    .table {
      margin: 10px 0;
    }
  }
}

.vs-navbar-content {
  position: relative;
  padding: 0px;

  .vs-navbar__item {
    font-size: 20px;
    min-height: 66px;
  }
}

.vs-button--block {
  margin: 10px 0;
}
</style>
<style lang="stylus">
.vs-textarea
  border 2px solid transparent
  background rgb(244, 247, 248)
  color rgb(44, 62, 80)
  padding: 8px 14px
  border-radius 18px
  transition all 0.25s ease
  padding-left 10px
  font-family Arial
  transition: all 0.25s ease;
  &::placeholder
    font-family Microsoft YaHei
    color #C0C7CC
</style>
<style lang="stylus">
getColor(vsColor, alpha = 1)
    unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
getVar(var)
    unquote("var(--vs-"+var+")")
.not-margin
  margin 0px
  font-weight normal
  padding 10px
.con-form
  width 100%
  .form-list
     display flex
     align-items center
     .vs-avatar-content
      margin-right 10px
     .vs-select
      width 300px
      &:hover
        background none
        box-shadow none
        transform none
  .message
    margin 20px 0 30px 0
  .flex
    display flex
    align-items center
    justify-content space-between
    a
      font-size .8rem
      opacity .7
      &:hover
        opacity 1
  .vs-checkbox-label
    font-size .8rem
  .vs-input-content
    margin 10px 0px
    width calc(100%)
    .vs-input
      width 300px

.footer-dialog
  display flex
  align-items center
  justify-content space-around
  flex-direction row
  width calc(100%)
  .new
    margin 0px
    margin-top 20px
    padding: 0px
    font-size .7rem
    a
      color getColor('primary') !important
      margin-left 6px
      &:hover
        text-decoration underline
  .vs-button
    margin 0px
</style>