import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Login from '../views/Login/Login.vue';
import Home from '../views/Home/Home.vue';
import MusicUser from '../views/ListView/Music/User.vue';
import MusicAll from '../views/ListView/Music/All.vue';
import MusicGroup from '../views/ListView/Music/Group.vue';
import VideoUser from '../views/ListView/Video/User.vue';
import VideoAll from '../views/ListView/Video/All.vue';
import VideoGroup from '../views/ListView/Video/Group.vue';

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
		redirect:'/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: Home,
			},
			{
				path: '/music_user',
				name: 'musicUser',
				component: MusicUser
			},
			{
				path: '/music_all',
				name: 'musicAll',
				component: MusicAll
			},
			{
				path: '/music_group',
				name: 'musicGroup',
				component: MusicGroup
			},
			{
				path: '/video_user',
				name: 'videoUser',
				component: VideoUser
			},
			{
				path: '/video_all',
				name: 'videoAll',
				component: VideoAll
			},
			{
				path: '/video_group',
				name: 'videoGroup',
				component: VideoGroup
			}
		]
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
