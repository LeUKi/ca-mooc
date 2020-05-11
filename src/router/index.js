import Vue from 'vue'
import VueRouter from 'vue-router'

import guest from '@/components/guest.vue'
import index from '@/components/admin/index.vue'
import login from '@/components/admin/login.vue'

import show from '@/components/show.vue'
import study from '@/components/study.vue'
import talk from '@/components/talk.vue'

import ggzs from '@/components/admin/ggzs.vue'
import hdjl from '@/components/admin/hdjl.vue'
import xxzy from '@/components/admin/xxzy.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/g',
      name: 'guest',
      component: guest,
      children: [{
        path: '/g',
        component: show
      }, {
        path: '/g/study',
        component: study
      }, {
        path: '/g/talk',
        component: talk
      },{
        path: '/login',
        name: 'login',
        component: login
      }]
    }, {
      path: '/admin',
      name: 'admin',
      component: index,
      children: [{
        path: '/admin',
        component: ggzs
      }, {
        path: '/admin/hdjl',
        component: hdjl
      }, {
        path: '/admin/xxzy',
        component: xxzy
      }]
    },  {
      path: '*',
      name: '404',
      redirect: '/g'
    }
  ]

const router = new VueRouter({
  routes
})

export default router
