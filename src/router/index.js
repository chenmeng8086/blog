import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 重写路由的push函数，否则路由跳转时会报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/note'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home')
    },
    {
      path: '/list',
      name: 'other',
      component: () => import('@/views/blogList')
    },
    {
      path: '/preview/:blogId',
      name: 'preview',
      component: () => import('@/views/preview')
    },
    {
      path: '/add/:position',
      name: 'add',
      component: () => import('@/views/editBlog')
    },
    {
      path: '/modify/:blogId',
      name: 'modify',
      component: () => import('@/views/editBlog')
    },
    {
      path: '/note',
      name: 'note',
      component: () => import('@/views/note')
    }
  ]
})

export default router
