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
    redirect:'/home',
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

router.beforeEach((to, from, next) => {
  // 检查用户是否登录
  console.log(document.cookie);
  next()
  /* if () {
    next('/login'); // 如果未登录，重定向到登录页面
  } else {
    next(); // 已登录，继续路由导航
  } */
});

export default router
