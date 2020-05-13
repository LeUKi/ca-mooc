import Vue from 'vue'
import VueRouter from 'vue-router'

import guest from '@/components/guest.vue'
import index from '@/components/admin/index.vue'
import login from '@/components/admin/login.vue'

import show from '@/components/show.vue'
import study from '@/components/study.vue'
import talk from '@/components/talk.vue'

import jj from '@/components/admin/jj.vue'
import gg from '@/components/admin/gg.vue'

import sjjx from '@/components/admin/study/sjjx.vue'
import wlk from '@/components/admin/study/wlk.vue'
import jz from '@/components/admin/study/jz.vue'
import zxcp from '@/components/admin/study/zxcp.vue'
import kc from '@/components/admin/study/kc.vue'

import wt from '@/components/admin/talk/wt.vue'
import hf from '@/components/admin/talk/hf.vue'

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
        }, {
            path: '/login',
            name: 'login',
            component: login
        }]
    }, {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/jj',
        component: index,
        children:
            [{
                path: '/admin/jj',
                component: jj
            }, {
                path: '/admin/gg',
                component: gg
            }, {
                path: '/admin/sjjx',
                component: sjjx
            }, {
                path: '/admin/wlk',
                component: wlk
            }, {
                path: '/admin/jz',
                component: jz
            }, {
                path: '/admin/zxcp',
                component: zxcp
            }, {
                path: '/admin/kc',
                component: kc
            }, {
                path: '/admin/wt',
                component: wt
            }, {
                path: '/admin/hf',
                component: hf
            }]
    }, {
        path: '*',
        name: '404',
        redirect: '/g'
    }
]

const router = new VueRouter({
    routes
})

export default router
