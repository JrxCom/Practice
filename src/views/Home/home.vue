<template>
  <div class="home">
    <div class="card" v-for="(item,index) in webArray" :key="index">
      <div class="header">
        <img :src="item.logo" alt="" />
        <p>{{item.name}}</p>
      </div>
      <p>
        {{item.describe}}
      </p>
      <vs-button border block> {{item.website}} </vs-button>
      <span>{{item.database}}</span>
      <label>{{new Date(item.creatime).toLocaleString()}}</label>
    </div>
  </div>
</template>

<script>
import { getWebList } from "@/api/web";

export default {
  name: "home",
  data() {
    return {
      webArray:[]
    };
  },
  created() {
    getWebList().then((res) => {
      this.webArray = res.data.obj.records
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