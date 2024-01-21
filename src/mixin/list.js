/* home页目录列表 */
export const home_use = {
	data() {
	  return {
		homeList: [
			{
				id: "Home",
				to: "/home",
				name: "HOME",
				icon: "bx bxs-home-heart",
				ischid:false
			},
			{
				id: "muisc",
				to: "",
				name: "音乐管理",
				icon: "bx bxs-music",
				ischid:true,
				children: [
				  {
					id: "Music_User",
					to: "/music_user",
					name: "用户管理",
					icon: "bx bxs-user-detail",
					ischid:false
				  },
				  {
					id: "Music_Group",
					to: "/music_group",
					name: "歌曲管理",
					icon: "bx bx-headphone",
					ischid:false
				  }
				],
			  },
			  {
				id: "video",
				to: "",
				name: "视频管理",
				icon: "bx bx-play",
				ischid:true,
				children: [
				  {
					id: "Video_User",
					to: "/video_user",
					name: "用户管理",
					icon: "bx bxs-user-detail",
					ischid:false
				  },
				  {
					id: "Video_Group",
					to: "/video_group",
					name: "视频管理",
					icon: "bx bxs-videos",
					ischid:false
				  }
				],
			  },
		  ]
	  };
	}
};