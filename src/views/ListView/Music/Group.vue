<template>
  <div>
    <vs-navbar square color='#F4F7F8' center-collapsed v-model="active">
      <template #left>
        <img src="/logo2.png" alt="">
      </template>
      <vs-navbar-item :active="active == 'guide'" id="guide">
        单曲
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'docs'" id="docs">
        歌单
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'components'" id="components">
        专辑
      </vs-navbar-item>
      <vs-navbar-item :active="active == 'license'" id="license">
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
      </div>

      <div class="song_list">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-star-half'></i>
          </template>
        </vs-alert>
      </div>

      <div class="album">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-playlist'></i>
          </template>
        </vs-alert>
      </div>

      <div class="singer">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-user-detail'></i>
          </template>
        </vs-alert>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'group',
  data() {
    return {
      active: 'guide',
    }
  },
}
</script>
  
<style lang='less' scoped>
@font-face {
  font-family: "show_date";
  src: url("../../../font/ShowDate.otf");
}

.vs-navbar-content {
  position: relative;
  padding: 0px;

  .vs-navbar__item {
    font-size: 20px;
    min-height: 66px;
  }
}
</style>