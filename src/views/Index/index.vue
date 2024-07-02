<template>
  <div class="index">
    <el-menu :default-active="active" class="menu_view">
      <div class="header_view">
        <img width="30" height="30" src="@/assets/common/logo.png" />
        <h3>LeaRneR</h3>
      </div>
      <el-menu-item index="home" @click="go_menu('/home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">Home</span>
      </el-menu-item>
      <el-submenu index="web">
        <template slot="title">
          <i class="el-icon-monitor"></i>
          <span>Web</span>
        </template>
        <el-menu-item
          v-for="(item, index) in menuArray"
          :key="index"
          :index="item.id.toString()"
          @click="go_menu('/web', item.id)"
        >
          <img width="20" height="20" :src="fileUrl + item.logo" alt="" />
          {{ item.name }}
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="manage" @click="go_menu('/manage')">
        <i class="el-icon-set-up"></i>
        <span slot="title">Manage</span>
      </el-menu-item>
      <div class="footer_view">
        <el-tooltip
          effect="dark"
          content="<前端:vue.js><预处理器:less><后端:node.js>"
          placement="top-start"
        >
          <div class="code">
            <img width="18" height="18" src="@/assets/index/code.png" alt="" />
          </div>
        </el-tooltip>

        <div class="github" @click="go_github()">
          <img width="18" height="18" src="@/assets/index/github.png" alt="" />
        </div>

        <div class="screen" @click="screenCode = !screenCode">
          <img
            v-if="!screenCode"
            width="18"
            height="18"
            src="@/assets/index/fullScreen.png"
          />
          <img
            v-else
            width="18"
            height="18"
            src="@/assets/index/exitFullScreen.png"
          />
        </div>

        <div
          class="logout"
          @click="(dialogCode = true), $bus.$emit('close-tips')"
        >
          <img width="18" height="18" src="@/assets/index/logout.png" alt="" />
        </div>
      </div>
    </el-menu>
    <div class="view" :style="themeStyle">
      <router-view :key="$route.fullPath"></router-view>
    </div>

    <el-collapse-transition>
      <div class="logout_view" v-show="dialogCode">
        <div class="card_view">
          <div class="close_view" @click="dialogCode = false">
            <el-link type="danger" :underline="false"
              ><i class="el-icon-close"></i
            ></el-link>
          </div>
          <div class="header">提示</div>
          <div class="main">
            <p>是否退出登录？</p>
            <span>说明：退出成功后页面跳转到登录页</span>
          </div>
          <div class="footer">
            <div class="logout_button" @click="log_out()">
              <img
                width="14"
                height="14"
                src="@/assets/common/confirm.png"
                alt=""
              />
            </div>


            <div class="cancel_button" @click="dialogCode = false">
              <img
                width="14"
                height="14"
                src="@/assets/common/cancel.png"
                alt=""
              />
            </div>

          </div>
        </div>
      </div>
    </el-collapse-transition>
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
      fileUrl: process.env.VUE_APP_FILE_URL /* api路径 */,
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
          this.$message({
              message: res.data.message,
              type: "danger",
            });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 2000);
        }
      });
    },
    /* 进入web下创建的网站页面 */
    go_menu(path, id) {
      if (id) {
        this.$router.push({ path: "/web", query: { id: id } });
      } else {
        this.$router.push({ path });
      }
    },
    /* 退出登录 */
    log_out() {
      logout().then((res) => {
        if (res.data.status === 200) {
          this.dialogCode = false;
          this.$message({
              message: res.data.message,
              type: "success",
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
    go_github() {
      window.open(this.$store.state.github, "_blank");
    },
  },
};
</script>

<style lang='less' scoped>
@import "index.less";
</style>