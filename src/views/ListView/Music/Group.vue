<template>
  <div class="music_group">
    <vs-navbar square color='#F4F7F8' center-collapsed v-model="menucode">
      <template #left>
        <img src="/logo2.png" alt="">
      </template>
      <vs-navbar-item :active="menucode == 'guide'" id="guide">
        单曲
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'docs'" id="docs">
        歌单
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'components'" id="components">
        专辑
      </vs-navbar-item>
      <vs-navbar-item :active="menucode == 'license'" id="license">
        歌手
      </vs-navbar-item>
    </vs-navbar>
    <div class="content" style="padding: 20px;">
      <div class="song">
        <vs-alert>
          <template #icon>
            <i class='bx bxl-deezer'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <div>
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
          <vs-button
        square
        danger
        border
      >
        <i class="bx bxs-heart"></i> Like
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


      <div class="song_list">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-star-half'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button flat>
            <i class='bx bxs-folder-plus'></i>添加歌单
          </vs-button>
          <vs-button success flat>
            <i class='bx bxs-message-alt-edit'></i>修改歌单信息
          </vs-button>
          <vs-button danger flat>
            <i class='bx bxs-message-alt-x'></i>删除歌单
          </vs-button>
        </div>
      </div>

      <div class="album">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-playlist'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button border>
            <i class='bx bxs-folder-plus'></i>添加专辑
          </vs-button>
          <vs-button success border>
            <i class='bx bxs-message-alt-edit'></i>修改专辑信息
          </vs-button>
          <vs-button danger border>
            <i class='bx bxs-message-alt-x'></i>删除专辑
          </vs-button>
        </div>
      </div>

      <div class="singer">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-user-detail'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button>
            <i class='bx bxs-folder-plus'></i>添加歌手
          </vs-button>
          <vs-button success>
            <i class='bx bxs-message-alt-edit'></i>修改歌手信息
          </vs-button>
          <vs-button danger>
            <i class='bx bxs-message-alt-x'></i>删除歌手
          </vs-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'group',
  data() {
    return {
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
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_lyric": false,
          },
          {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_lyric": false,
          }, {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_lyric": false,
          }, {
            "s_id": 12312312301,
            "s_name": "Leanne Graham",
            "s_singer": "Bret",
            "s_src": "Sincere@april.biz",
            "s_time": '02:02',
            "s_lyric": true,
          },
          {
            "s_id": 21231231230,
            "s_name": "Ervin Howell",
            "s_singer": "Antonette",
            "s_src": "Shanna@melissa.tv",
            "s_time": '02:02',
            "s_lyric": false,
          }
        ],
        dialog_add_edit: false,
        dialog_remove: false,
        form_add_edit: {

        },
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
    .btns {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

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