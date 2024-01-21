import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '@/views/index.vue';


Vue.use(VueRouter)
let routes = [
	{
		path: '/',
		name: 'index',
		component: Index,
		redirect: '/Home',
		children: []
	}
]
const router_context = require.context('../views/', true, /\.vue$/)
router_context.keys().forEach(item => {
	if (item.split('/').length - 1 > 2 && item.indexOf('Component') == -1) {
		let path = (item.slice(item.indexOf('/', 2) + 1, item.lastIndexOf('/'))).replace(/\//g, '_')
		let name = path
		let component = item.slice(item.indexOf('.') + 1)
		routes[0].children.push({
			path,
			name,
			component: () => import(`@/views${component}`)
		})
	} else if (item.split('/').length - 1 === 2) {
		let path = item.slice(item.lastIndexOf('/'), item.lastIndexOf('.'))
		let name = item.slice(item.lastIndexOf('/') + 1, item.lastIndexOf('.'))
		let component = item.slice(item.indexOf('.') + 1)
		routes.push({
			path,
			name,
			component: () => import(`@/views${component}`)
		})
	}
})

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})



router.beforeEach((to, from, next) => {
	if(document.cookie && document.cookie.length > 13){
		if(to.path != '/login'){
			next()
		}else{
			next('/')
		}
	}else{
		if(to.path == '/login'){
			next()
		}else{
			next('/login')
		}
	}
	next()
  })


export default router
