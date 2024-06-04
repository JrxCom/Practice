<template>
  <div class="index" :style="themeStyle">
    <!-- 菜单 -->
    <div class="menu">
      <vs-sidebar style="position: static !important" v-model="active" open>
        <template #logo>
          <img v-if="!themeCode" src="@/assets/common/lightLogo.png" />
          <img v-else src="@/assets/common/darkLogo.png" />
          <h3>LeaRneR</h3>
        </template>
        <vs-sidebar-item id="home" to="/home">
          <template #icon>
            <img v-if="!themeCode" src="@/assets/index/lightHome.png" alt="" />
            <img v-else src="@/assets/index/darkHome.png" alt="" />
          </template>
          Home
        </vs-sidebar-item>

        <vs-sidebar-group>
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
              <img :src="item.logo" alt="" />
            </template>
            {{ item.name }}
          </vs-sidebar-item>
        </vs-sidebar-group>

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

        <template #footer>
          <vs-tooltip>
            <vs-button icon color="#808b96">
              <img src="@/assets/index/code.png" />
            </vs-button>
            <template #tooltip>
              <p>前端:Vue.js</p>
              <p>预处理器:less</p>
              <p>后端:node.js</p>
            </template>
          </vs-tooltip>
          <vs-button icon @click="themeCode = !themeCode">
            <img v-if="!themeCode" src="@/assets/index/light.png" />
            <img v-else src="@/assets/index/dark.png" />
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
      menuArray: new Array() /* 菜单列表 */,
    };
  },
  created() {
    this.active = this.$route.name;
    this.get_menu_list();
  },
  methods: {
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
    go_web(id) {
      this.$router.push({ path: "/web/?id=" + id, query: { id: id } });
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
  },
};
</script>

<style lang='less' scoped>
@import "index.less";
</style>