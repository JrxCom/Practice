<template>
  <div class="home">
    <div class="card" v-for="(item, index) in webArray" :key="index">
      <div class="header">
        <img :src="item.logo" alt="" />
        <p>{{ item.name }}</p>
      </div>
      <p>
        {{ item.describe }}
      </p>
      <vs-button border block> {{ item.website }} </vs-button>
      <span>{{ item.database }}</span>
      <label>{{ new Date(item.creatime).toLocaleString() }}</label>
    </div>
  </div>
</template>

<script>
/* 引入获取网站列表api */
import { getWebList } from "@/api/web";

export default {
  name: "home",
  data() {
    return {
      webArray: [] /* 网站列表 */,
      tips: undefined /* 提示实体 */,
    };
  },
  beforeCreate() {
    this.$bus.$on("close-tips", () => {
      this.close_tips();
    });
    this.$bus.$on("open-tips", () => {
      this.open_tips();
    });
  },
  created() {
    getWebList().then((res) => {
      if (res.data.status === 200) {
        this.webArray = res.data.obj.records;
        if (this.webArray.length === 0) {
          this.open_tips();
        }
      } else {
        this.$vs.notification({
          flat: true,
          color: "danger",
          progress: "auto",
          position: "top-center",
          duration: "2000",
          buttonClose: false,
          title: `${message}`,
        });
        setTimeout(() => {
          this.$router.push({ path: "/login" });
        }, 2000);
      }
    });
  },
  methods: {
    open_tips() {
      this.tips = this.$vs.notification({
        square: true,
        duration: "none",
        flat: true,
        border: "success",
        color: "success",
        position: "top-center",
        title: "当前无网站信息，可网站管理中添加信息。",
        text: `
            1.点击左侧Manage菜单；</br>
            2.点击Add Web按钮添加网站信息；</br>
            3.点击Add Table按钮添加表信息；</br>
            4.点击Add Field按钮添加字段信息；
            `,
        buttonClose: false,
        progress: "auto",
      });
    },
    close_tips() {
      this.tips.close();
    },
  },
  destroyed() {
    this.close_tips();
    this.$bus.$off('open-tips')
    this.$bus.$off('close-tips')
  },
};
</script>

<style lang="less">
@import "home.less";
</style>