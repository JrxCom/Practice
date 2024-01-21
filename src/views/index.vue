<template>
  <div class="index">
    <vs-sidebar v-model="menuCode" open>
      <template #logo>
        <img src="../assets/logo_.png" alt="" />
      </template>
      <div v-for="(item, index) in homeList" :key="index">
        <vs-sidebar-item :id="item.id" :to="item.to" v-if="!item.ischid">
          <template #icon>
            <i :class="item.icon"></i>
          </template>
          {{ item.name }}
        </vs-sidebar-item>
        <vs-sidebar-group v-else>
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <i :class="item.icon"></i>
              </template>
              {{ item.name }}
            </vs-sidebar-item>
          </template>
          <div v-for="(items, index) in item.children" :key="index">
            <vs-sidebar-item :id="items.id" :to="items.to">
              <template #icon>
                <i :class="items.icon"></i>
              </template>
              {{ items.name }}
            </vs-sidebar-item>
          </div>
        </vs-sidebar-group>
      </div>
    </vs-sidebar>
    <div class="right">
      <div class="head">
        <div class="btns">
          <vs-tooltip bottom>
            <vs-button icon dark shadow>
              <i class="bx bx-code-alt"></i>技术栈
            </vs-button>
            <template #tooltip>
              <div>
                <p>前端框架：Vue2</p>
                <p>预处理器：Less</p>
                <p>组件库：Vuesax</p>
                <p>后端接口：Node.js</p>
              </div>
            </template>
          </vs-tooltip>
          <vs-button icon dark shadow @click="goGit()">
            <i class="bx bxl-github"></i>
          </vs-button>
          <vs-button icon color="danger" border @click="dialog_logout_code = true">
            <i class="bx bx-power-off"></i>
          </vs-button>
        </div>
      </div>
      <div>
        <router-view></router-view>

      </div>
    </div>

    <!-- 用户退出 -->
    <vs-dialog blur v-model="dialog_logout_code">
      <template #header>
        <h4 class="not-margin">
          <b>确认退出用户登录？</b>
        </h4>
      </template>
      <template #footer>
        <div class="footer-dialog">
          <vs-button @click="goLogout()"> 确认 </vs-button>
          <vs-button border dark @click="dialog_logout_code = false"> 取消 </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<script>
import { home_use } from "@/mixin/list";
import { get_info, logout } from '@/api/_/admin_user'
export default {
  name: "index",
  mixins: [home_use],
  components: {},
  data() {
    return {
      menuCode: "",
      dialog_theme_code: false,
      dialog_logout_code: false,
      state: [],
      themeList: [],
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.menuCode = newVal.name
        this.homeList.forEach((item) => {
          if (item.to === "") {
            item.to = "/" + item.id;
          }
          if (newVal.path === item.to) {
            item.to = "";
          }
          if (item.ischid) {
            item.children.forEach((item_) => {
              if (item_.to === "") {
                item_.to = oldVal.path;
              }
              if (newVal.path === item_.to) {
                item_.to = "";
              }
            });
          }
        });
      },
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    getInfo() {
      get_info().then(res => {
        this.state['mstate'] = ~~res.data.obj.music_state
        this.state['vstate'] = ~~res.data.obj.video_state
      })
    },
    goLogout() {
      logout().then(res => {
        document.cookie = 'cookie_value='
        this.$vs.notification({
          color: "success",
          position: "top-center",
          text: res.data.message,
          duration: "2000",
          square: true,
          flat: true,
          icon: `<i class='bx bx-check' ></i>`,
        })
        setTimeout(() => {
          location.reload()
        }, 2000)
      })
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  display: flex;
  flex-direction: row;

  .right {
    width: 100%;

    .head {
      height: 4vh;
      background-color: #fff;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      padding: 10px;
      box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.05);

      .btns {
        display: flex;
        align-items: center;
      }
    }
  }
}

.vs-sidebar-content {
  position: unset;
  border-radius: 0px;
}

.theme_list {
  width: 16px;
  height: 16px;
  margin: 10px;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #FFF;
    cursor: pointer;
  }
}
</style>
