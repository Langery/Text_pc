import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/onlinecs/',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/user',
      component: () => import('@/view/mainView'),
      children: [
        {
          path: '/onlinecs',
          redirect: '/home'
        },
        {
          path: '/home',
          name: 'MainIndex',
          component: () => import('@/view/mainView/mainIndex')
        },
        {
          path: '/user/history',
          name: 'HistoryIndex',
          component: () => import('@/view/mainView/historyIndex.vue')
        },
        {
          path: '/user/infor',
          name: 'InforIndex',
          component: () => import('@/view/mainView/inforIndex.vue')
        },
        {
          path: '/user/setting',
          name: 'SettingIndex',
          component: () => import('@/view/mainView/settingIndex.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'LogIndex',
      component: () => import('@/view/logIndex')
    }
  ]
})
