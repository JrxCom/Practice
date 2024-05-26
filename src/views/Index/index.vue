<template>
  <div class="index" :style="themeStyle">
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

          <vs-sidebar-item id="web" to="/web">
            <template #icon>
              <img src="@/assets/index/Music.png" alt="" />
            </template>
            Music
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
          <vs-button icon color="danger" @click="dialogCode = true">
            <img src="@/assets/index/logout.png" />
          </vs-button>
        </template>
      </vs-sidebar>
    </div>
    <div class="view" :style="themeStyle">
      <router-view></router-view>
    </div>
    <div class="dialog">
        <transition name="dialog">
        <div class="logout" v-show="dialogCode">
          <div class="card_logout">
            <div class="close" @click="dialogCode = false">
              <vs-button icon border warn>
                <img src="@/assets/common/warnClose.png" />
              </vs-button>
            </div>
            <div class="header">
              提示
            </div>
            <div class="main">
              <p>是否退出登录?</p>
              <span>说明：退出成功后页面跳转到登录页</span>
            </div>
            <div class="footer">
              <vs-button icon warn>
                <img src="@/assets/common/confirm.png" />
              </vs-button>
              <vs-button icon color="#808b96" @click="dialogCode = false">
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
import theme from "@/mixin/theme.js";
export default {
  name: "index",
  mixins: [theme],
  data() {
    return {
      active: "home",
      dialogCode:false
    };
  },
  created() {
    this.active = this.$route.name;
  },
};
</script>

<style lang='less' scoped>
@import "index.less";
</style>