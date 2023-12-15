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
          <vs-button icon color="warn" border @click="changeTheme()">
            <i class="bx bxs-color"></i>
          </vs-button>
          <vs-button icon color="danger" border @click="goLogout()">
            <i class="bx bx-power-off"></i>
          </vs-button>
        </div>
      </div>
	  <div>
		<router-view></router-view>

	  </div>
    </div>
  </div>
</template>
<script>
import { home_use } from "@/mixin/homeList";
export default {
  name: "index",
  mixins: [home_use],
  components: {},
  data() {
    return {
      menuCode: "",
    };
  },
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.menuCode = newVal.name
        console.log(newVal);
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
    },
  },
  created() {},
  methods: {},
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
</style>
