// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import Antd from 'ant-design-vue'
import 'view-design/dist/styles/iview.css'
import 'ant-design-vue/dist/antd.css'
import store from './store'

Vue.use(ViewUI)
Vue.use(Antd)
Vue.config.productionTip = false

// 全局路由钩子，权限管理，注意next()会导致死循环
router.beforeEach((to, from, next) => {
  try {
    if (to.path !== '/login') {
      const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
      if (userInfo.id) {
        store.dispatch('common/changeUserInfo', userInfo)
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  } catch (err) {
    next('/login')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
