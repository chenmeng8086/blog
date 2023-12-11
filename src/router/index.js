import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home'
import preview from '@/views/preview'
import add from '@/views/editBlog/createBlog'
import modify from '@/views/editBlog/modifyBlog'
import login from '@/views/login'
import blogList from '@/views/blogList'
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
      redirect: '/list'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/list',
      name: 'other',
      component: blogList
    },
    {
      path: '/preview/:blogId',
      name: 'preview',
      component: preview
    },
    {
      path: '/add/:position',
      name: 'add',
      component: add
    },
    {
      path: '/modify/:blogId',
      name: 'modify',
      component: modify
    }
  ]
})

export default router
