<template>
  <div class="index" :style="themeStyle">
    <!-- 菜单 -->
    <div class="menu">
      <vs-sidebar style="position: static !important" v-model="active" open>
        <!-- logo图 -->
        <template #logo>
          <img v-if="!themeCode" src="@/assets/common/lightLogo.png" />
          <img v-else src="@/assets/common/darkLogo.png" />
          <h3>LeaRneR</h3>
        </template>
        <!-- home页 -->
        <vs-sidebar-item id="home" to="/home">
          <template #icon>
            <img v-if="!themeCode" src="@/assets/index/lightHome.png" alt="" />
            <img v-else src="@/assets/index/darkHome.png" alt="" />
          </template>
          Home
        </vs-sidebar-item>
        <!-- web页 -->
        <vs-sidebar-group open v-if="menuArray.length">
          <template #header>
            <vs-sidebar-item arrow>
              <template #icon>
                <img
                  v-if="!themeCode"
                  src="@/assets/index/lightWeb.png"
                  alt=""
                />
                <img v-else src="@/assets/index/darkWeb.png" alt="" />
              </template>
              WEB
            </vs-sidebar-item>
          </template>
          <vs-sidebar-item
            v-for="(item, index) in menuArray"
            :key="index"
            :id="item.id"
            @click.native="go_web(item.id)"
          >
            <template #icon>
              <img :src="apiUrl + item.logo" alt="" />
            </template>
            {{ item.name }}
          </vs-sidebar-item>
        </vs-sidebar-group>
        <!-- manage页 -->
        <vs-sidebar-item id="manage" to="/manage">
          <template #icon>
            <img
              v-if="!themeCode"
              src="@/assets/index/lightManage.png"
              alt=""
            />
            <img v-else src="@/assets/index/darkManage.png" alt="" />
          </template>
          Manage
        </vs-sidebar-item>
        <!-- 底部按钮 -->
        <template #footer>
          <vs-tooltip>
            <vs-button icon color="#364758">
              <img src="@/assets/index/code.png" />
            </vs-button>
            <template #tooltip>
              <p>前端:{{ $store.state.stack.front_end }}</p>
              <p>预处理器:{{ $store.state.stack.back_end }}</p>
              <p>后端:{{ $store.state.stack.preprocessor }}</p>
            </template>
          </vs-tooltip>
          <vs-button icon @click="themeCode = !themeCode">
            <img v-if="!themeCode" src="@/assets/index/light.png" />
            <img v-else src="@/assets/index/dark.png" />
          </vs-button>
          <vs-button icon color="#42B983" @click="screenCode = !screenCode">
            <img v-if="!screenCode" src="@/assets/index/fullScreen.png" />
            <img v-else src="@/assets/index/exitFullScreen.png" />
          </vs-button>
          <vs-button
            icon
            color="warn"
            @click.native="go_github()"
          >
            <img src="@/assets/index/github.png" />
          </vs-button>
          <vs-button
            icon
            color="danger"
            @click="(dialogCode = true), $bus.$emit('close-tips')"
          >
            <img src="@/assets/index/logout.png" />
          </vs-button>
        </template>
      </vs-sidebar>
    </div>
    <!-- 内容 -->
    <div class="view" :style="themeStyle">
      <router-view :key="$route.fullPath"></router-view>
    </div>
    <!-- 退出登录弹窗 -->
    <div class="dialog">
      <transition name="dialog">
        <div class="logout" v-show="dialogCode">
          <div class="card_logout">
            <div
              class="close"
              @click="(dialogCode = false), $bus.$emit('open-tips')"
            >
              <vs-button icon border danger>
                <img src="@/assets/common/removeClose.png" />
              </vs-button>
            </div>
            <div class="header">提示</div>
            <div class="main">
              <p>是否退出登录？</p>
              <span>说明：退出成功后页面跳转到登录页</span>
            </div>
            <div class="footer">
              <vs-button icon danger @click="log_out()">
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button
                icon
                color="#808b96"
                @click="(dialogCode = false), $bus.$emit('open-tips')"
              >
                <img src="@/assets/common/cancel.png" />
              </vs-button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
/* 引入主题混入 */
import theme from "@/mixin/theme.js";
/* 引入退出api */
import { logout } from "@/api/log";
/* 引入获取网站列表api */
import { getWebList } from "@/api/web";
export default {
  name: "index",
  mixins: [theme],
  data() {
    return {
      active: "home" /* 当前菜单 */,
      dialogCode: false /* 退出弹窗显示参数 */,
      logoutTipsCode: false /* 退出提示显示参数 */,
      logoutTipsMessage: "" /* 退出提示文字 */,
      menuArray: new Array(20) /* 菜单列表 */,
      screenCode: false /* 全屏参数 */,
      apiUrl: process.env.VUE_APP_BASE_API /* api路径 */,
    };
  },
  watch: {
    /* 监控全屏 */
    screenCode() {
      this.full_screen();
    },
  },
  beforeCreate() {
    /* 更新菜单数据 */
    this.$bus.$on("update-menu", () => {
      this.get_menu_list();
    });
  },
  created() {
    /* 页面存在id视为web下网站数据页面，则为home或者manage页面 */
    if (this.$route.query.id) {
      this.active = this.$route.query.id;
    } else {
      this.active = this.$route.name;
    }
    this.get_menu_list();
  },
  mounted() {
    /* 页面大小发生变化触发：监控全屏 */
    window.onresize = () => {
      this.screenCode = Boolean(
        document.fullscreenElement ||
          document.msFullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullscreenElement
      );
    };
  },
  methods: {
    /* 获取菜单列表 */
    get_menu_list() {
      getWebList().then((res) => {
        if (res.data.status === 200) {
          this.menuArray = res.data.obj.records;
        } else {
          this.$vs.notification({
            flat: true,
            color: "danger",
            progress: "auto",
            position: "top-center",
            duration: "2000",
            buttonClose: false,
            title: `${res.data.message}`,
          });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 2000);
        }
      });
    },
    /* 进入web下创建的网站页面 */
    go_web(id) {
      this.$router.push({ path: "/web", query: { id: id } });
    },
    /* 退出登录 */
    log_out() {
      logout().then((res) => {
        if (res.data.status === 200) {
          this.dialogCode = false;
          this.$vs.notification({
            flat: true,
            color: "primary",
            progress: "auto",
            position: "top-center",
            duration: "1500",
            buttonClose: false,
            title: `${res.data.message}`,
          });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1500);
        }
      });
    },
    /* 全屏切换 */
    full_screen() {
      if (this.screenCode) {
        const element = document.documentElement;
        if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        } else if (element.mozRequestFullscreen) {
          element.mozRequestFullscreen();
        } else if (element.requestFullscreen) {
          element.requestFullscreen();
        }
      } else {
        if (document.fullscreenElement !== null) {
          document.exitFullscreen();
        }
      }
    },
    /* 跳转github网站 */
    go_github(){
      window.open(this.$store.state.github, '_blank') 
    }
  },
};
</script>

<style lang='less' scoped>
@import "index.less";
</style>