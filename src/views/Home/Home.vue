<template>
  <div class="home">
    <div class="web">
      <div class="content">
        <!-- 音乐 -->
        <div class="list">
          <vs-card type="2">
          <template #title>
            <h1>MUSIC</h1>
          </template>
          <template #img>
            <img src="../../assets/web_list/Music.png" alt="" />
          </template>
          <template #text>
            <p v-for="(item, index) in music_" :key="index">
              <i :class="item.icon"></i
              ><span class="card_label">{{ item.label }}:</span
              ><span class="card_num">{{ item.num }}</span>
            </p>
          </template>
        </vs-card>
        </div>
         <!-- 视频 -->
        <div class="list">
          <vs-card type="2">
          <template #title>
            <h1>VIDEO</h1>
          </template>
          <template #img>
            <img src="../../assets/web_list/Video.png" alt="" />
          </template>
          <template #text>
            <p v-for="(item, index) in video_" :key="index">
              <i :class="item.icon"></i
              ><span class="card_label">{{ item.label }}:</span
              ><span class="card_num">{{ item.num }}</span>
            </p>
          </template>
        </vs-card>
        </div>
       
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      music_: [
        { id: 1, icon: "bx bxs-user", label: "用户人数", num: "10" },
        { id: 2, icon: "bx bxs-user-plus", label: "今日注册人数", num: "10" },
        { id: 3, icon: "bx bxs-user-voice", label: "今日登录人数", num: "10" },
        { id: 4, icon: "bx bxs-music", label: "歌曲总数", num: "10" },
        { id: 5, icon: "bx bxs-cloud-upload", label: "今日上传数", num: "10" },
      ],
      video_: [
        { id: 1, icon: "bx bxs-user", label: "用户人数", num: "10" },
        { id: 2, icon: "bx bxs-user-plus", label: "今日注册人数", num: "10" },
        { id: 3, icon: "bx bxs-user-voice", label: "今日登录人数", num: "10" },
        { id: 4, icon: "bx bxs-music", label: "视频总数", num: "10" },
        { id: 5, icon: "bx bxs-cloud-upload", label: "今日上传数", num: "10" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
@font-face {
  font-family: "show_date";
  src: url("../../font/ShowDate.otf");
}
.home{
	.web{
		.content{
			display: flex;
			flex-wrap: wrap;
			@my-card:card;
      .list{
        margin: 20px;
        .@{my-card}_label{
				font-family: cursive;
				font-weight: 600;
				font-size: 20px;
			}
			.@{my-card}_num{
				font-family: 'show_date';
				font-weight: 600;
				font-size: 20px;
			}
      }
			
		}
	}
}
</style>
