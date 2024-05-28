<template>
  <div class="home">
    <div class="card">
      <div class="header">
        <img src="@/assets/index/Music.png" alt="" />
        <p>Music</p>
      </div>
      <p>
        当数据源发生变化时会根据最新的数据源自动更新页面的结构当表单元素的值发生变化时
      </p>
      <vs-button border block> www.baidu.com </vs-button>
      <span>MUSIC</span>
      <label>2024-01-01 12:22:01</label>
    </div>
  </div>
</template>

<script>
import { getWebList } from "@/api/web";

export default {
  name: "home",
  data() {
    return {};
  },
  created() {
    getWebList().then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="less">
.home {
  padding: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 16px;
  .card {
    width: 16vw;
    padding: 20px;
    border-radius: 20px;
    background-color: var(--theme-background-color_);
    display: flex;
    flex-direction: column;
    align-items: self-start;
    gap: 6px;
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 30px;
      img {
        width: 20px;
        height: 20px;
        padding: 10px;
        background-color: var(--theme-background-color);
        border-radius: 10px;
      }
      p {
        font-family: "cFont";
        font-size: 16px;
        color: var(--theme-font-color);
      }
    }
    p {
      font-size: 12px;
      font-family: "eFontL";
      color: var(--theme-font-color);
    }
    span {
      font-size: 14px;
      font-family: "eFontM";
      color: var(--theme-font-color);
    }
    label {
      font-size: 12px;
      font-family: "eFontM";
      color: #808b96;
    }
  }
}
</style>