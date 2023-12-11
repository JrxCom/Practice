<template>
  <div class="music_group">
    <vs-navbar square color='#F4F7F8' center-collapsed v-model="menucode">
      <template #left>
        <img src="/logo2.png" alt="">
      </template>
      <vs-navbar-item :active="menucode == 'license'" id="license">
        标签管理
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'guide'" id="guide">
        单曲
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'license'" id="license">
        歌手
      </vs-navbar-item>
    </vs-navbar>
    <div class="content">
      <div class="filtrate">
        <vs-alert>
          <template #icon>
            <i class='bx bx-filter-alt'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button gradient @click="filtrate.dialog_add_edit = true">
            <i class='bx bxs-message-alt-add'></i>添加歌单类别
          </vs-button>
          <vs-button success gradient @click="filtrate.dialog_add_edit = true">
            <i class='bx bxs-message-alt-edit'></i>修改歌单类别
          </vs-button>
          <vs-button danger gradient @click="filtrate.dialog_remove = true">
            <i class='bx bxs-message-alt-x'></i>删除歌单类别
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
                <template #expand>
              <div class="con-content">
                <div>
                  <vs-avatar>
                    <img :src="`/avatars/avatar-${i + 1}.png`" alt="">
                  </vs-avatar>
                  <p>
                    {{ tr.name }}
                  </p>
                </div>
                <div>
                  <vs-button flat icon>
                    <i class='bx bx-lock-open-alt' ></i>
                  </vs-button>
                  <vs-button flat icon>
                    Send Email
                  </vs-button>
                  <vs-button border danger>
                    Remove User
                  </vs-button>
                </div>
              </div>
            </template>
              </vs-tr>
            </template>
            
            <template #footer>
              <vs-pagination v-model="song.page"
                :length="$vs.getLength($vs.getSearch(song.data, song.search), song.max)" />
            </template>
          </vs-table>
        </div>
      </div>

      <div class="song">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-playlist'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button gradient @click="song.dialog_add_edit = true">
            <i class='bx bxs-message-alt-add'></i>添加歌曲
          </vs-button>
          <vs-button success gradient @click="song.dialog_add_edit = true">
            <i class='bx bxs-message-alt-edit'></i>修改歌曲信息
          </vs-button>
          <vs-button danger gradient @click="song.dialog_remove = true">
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
            <vs-input type="text" v-model="input2" placeholder="歌曲名称">
              <template #icon>
                <i class='bx bxs-paint'></i>
              </template>
            </vs-input>

            <vs-input type="text" v-model="input2" placeholder="歌手">
              <template #icon>
                <i class='bx bxs-user-circle'></i>
              </template>
            </vs-input>

            <vs-button block dark border animation-type="vertical">
              歌曲上传
              <template #animate>
                <i class='bx bx-cloud-upload'></i>
              </template>
            </vs-button>

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
            <p>删除歌曲将无法找回!</p>
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

      <div class="singer">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-user-detail'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button gradient @click="singer.dialog_add_edit = true">
            <i class='bx bxs-user'></i>添加歌手
          </vs-button>
          <vs-button success gradient>
            <i class='bx bxs-message-alt-edit'></i>修改歌手信息
          </vs-button>
          <vs-button danger gradient @click="singer.dialog_remove = true">
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
          <b style="margin: 10px;background-color: #F4F7F8;padding: 10px;font-size: 12px;border-radius: 10px;">{{ singer.intro }}</b>
        </vs-dialog>

        <vs-dialog blur v-model="singer.dialog_add_edit" not-center prevent-close auto-width>
          <template #header>
            <h4 class="not-margin">
              <b>添加歌手</b>
            </h4>
          </template>

          <div class="con-form">
            <vs-input type="text" v-model="input2" placeholder="姓名">
              <template #icon>
                <i class='bx bxs-user-circle'></i>
              </template>
            </vs-input>

            <vs-button block dark border animation-type="vertical">
              头像上传
              <template #animate>
                <i class='bx bx-cloud-upload'></i>
              </template>
            </vs-button>

            <div style="display: flex;align-items: center;">
              <vs-avatar size="30" square>
                <i class='bx bx-male-female'></i>
              </vs-avatar>
              <div style="margin-right: 20px;"></div>
              <vs-radio v-model="picked" val="1">
                <i class='bx bx-male-sign'></i>
              </vs-radio>
              <vs-radio v-model="picked" val="2">
                <i class='bx bx-female-sign'></i>
              </vs-radio>
            </div>

            <div style="display: flex;align-items: flex-start;margin-top: 10px;">
              <vs-avatar size="30" square>
                <i class='bx bxs-receipt' ></i>
              </vs-avatar>
              <div style="margin-right: 20px;"></div>
              <textarea
                style="border-radius: 10px;background-color: #F4F7F8;border: 1px solid #F4F7F8;padding: 6px;font-weight: 600;font-family: fangsong;"
                name="" id="" cols="30" rows="8"></textarea>
            </div>

            <div style="display: flex;align-items: center;margin-top: 10px;">
              <vs-avatar size="30" square>
                <i class='bx bxs-flag-alt'></i>
              </vs-avatar>
              <div style="margin-right: 20px;"></div>
              <vs-select placeholder="Select" v-model="value">
                <vs-option label="Vuesax" value="1">
                  Vuesax
                </vs-option>
                <vs-option label="Vue" value="2">
                  Vue
                </vs-option>
              </vs-select>
            </div>

            <div style="display: flex;align-items: center;margin-top: 10px;">
              <vs-avatar size="30" square>
                <i class='bx bxs-label' ></i>
              </vs-avatar>
              <div style="margin-right: 20px;"></div>
              <vs-select placeholder="Select" v-model="value">
                <vs-option label="Vuesax" value="1">
                  Vuesax
                </vs-option>
                <vs-option label="Vue" value="2">
                  Vue
                </vs-option>
              </vs-select>
            </div>

            <vs-input type="date" v-model="input2" placeholder="生日">
              <template #icon>
                <i class='bx bxs-cake' ></i>
              </template>
            </vs-input>

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
            <p>删除歌手将无法找回!</p>
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
      menucode: 'guide',
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
        dialog_intro:false,
        intro:'',

      },
    }
  },
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
      width 100%
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