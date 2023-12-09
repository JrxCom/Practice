<template>
  <div class="music_group">
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
        <div class="btns">
          <vs-button gradient>
            <i class='bx bxs-message-alt-add'></i>添加歌曲
          </vs-button>
          <vs-button success gradient>
            <i class='bx bxs-message-alt-edit'></i>修改歌曲信息
          </vs-button>
          <vs-button danger gradient>
            <i class='bx bxs-message-alt-x'></i>删除歌曲
          </vs-button>
        </div>
      </div>
      <div class="song_list">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-star-half'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button flat>
            <i class='bx bxs-folder-plus' ></i>添加歌单
          </vs-button>
          <vs-button success flat>
            <i class='bx bxs-message-alt-edit'></i>修改歌单信息
          </vs-button>
          <vs-button danger flat>
            <i class='bx bxs-message-alt-x'></i>删除歌单
          </vs-button>
        </div>
      </div>

      <div class="album">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-playlist'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button border>
            <i class='bx bxs-folder-plus' ></i>添加专辑
          </vs-button>
          <vs-button success border>
            <i class='bx bxs-message-alt-edit'></i>修改专辑信息
          </vs-button>
          <vs-button danger border>
            <i class='bx bxs-message-alt-x'></i>删除专辑
          </vs-button>
        </div>
      </div>

      <div class="singer">
        <vs-alert>
          <template #icon>
            <i class='bx bxs-user-detail'></i>
          </template>
        </vs-alert>
        <div class="btns">
          <vs-button>
            <i class='bx bxs-folder-plus' ></i>添加歌手
          </vs-button>
          <vs-button success>
            <i class='bx bxs-message-alt-edit'></i>修改歌手信息
          </vs-button>
          <vs-button danger>
            <i class='bx bxs-message-alt-x'></i>删除歌手
          </vs-button>
        </div>
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

.music_group {
  .content {
    .btns {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
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