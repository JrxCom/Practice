/* home页目录列表 */
export const home_use = {
	data() {
	  return {
		homeList: [
			{
				id: "home",
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
					id: "musicUser",
					to: "/music_user",
					name: "用户管理",
					icon: "bx bxs-user-detail",
					ischid:false
				  },
				  {
					id: "musicGroup",
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
					id: "videoUser",
					to: "/video_user",
					name: "用户管理",
					icon: "bx bxs-user-detail",
					ischid:false
				  },
				  {
					id: "videoAll",
					to: "/video_all",
					name: "视频管理",
					icon: "bx bxs-grid",
					ischid:false
				  },
				  {
					id: "videoGroup",
					to: "/video_group",
					name: "分类管理",
					icon: "bx bx-layer-plus",
					ischid:false
				  }
				],
			  },
		  ],
	  };
	}
};