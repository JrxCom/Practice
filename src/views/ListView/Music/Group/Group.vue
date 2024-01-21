<template>
  <div class="music_group">
    <vs-navbar square color='#F4F7F8' center-collapsed v-model="menucode">
      <vs-navbar-item :active="menucode === 'filtrate'" id="filtrate">
        标签管理
      </vs-navbar-item>
      <vs-navbar-item :active="menucode === 'song'" id="song">
        歌曲管理
      </vs-navbar-item>
      <vs-navbar-item :active="menucode === 'singer'" id="singer">
        歌手管理
      </vs-navbar-item>
    </vs-navbar>
    <div class="content" v-show="menucode === 'filtrate'">
      <M_FILTRATE></M_FILTRATE>
    </div>
    <div class="content" v-show="menucode === 'song'">
      <M_SONG></M_SONG>
    </div>
    <div class="content" v-show="menucode === 'singer'">
      <M_SINGER></M_SINGER>
    </div>
  </div>
</template>
  
<script>
import M_FILTRATE from './Component/M_filtrate'
import M_SONG from './Component/M_song'
import M_SINGER from './Component/M_singer'
export default {
  name: 'group',
  components:{
    M_FILTRATE,
    M_SONG,
    M_SINGER
  },
  data() {
    return {
      menucode: 'filtrate'
    }
  }
}
</script>

<style lang='less' scoped>
@import 'Group.less';
</style>

