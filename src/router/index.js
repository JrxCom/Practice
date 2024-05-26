import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/login.vue')
  },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/Index/index.vue'),
    children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/home.vue')
    },
    {
      path: '/web',
      name: 'web',
      component: () => import('../views/Web/web.vue')
    },
    {
      path: '/manage',
      name: 'manage',
      component: () => import('../views/Manage/manage.vue')
    }
    ],
  }
]
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
