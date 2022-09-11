import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import {
  TrendCharts,
  Grid,
  List
} from '@element-plus/icons-vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/LoginView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/HomeView.vue'),
    children: [
      {
        path: '/echarts',
        name: 'echarts',
        component: () => import('../views/home/childrens/EchartsView.vue'),
        meta: {
          title: "数据展示",
          icon: TrendCharts
        }
      },
      {
        path: '/pay',
        name: 'pay',
        component: () => import('../views/home/childrens/PayList.vue'),
        meta: {
          title: "缴费管理",
          icon: Grid
        }
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/home/childrens/UserOne.vue'),
        meta: {
          title: "住户信息",
          icon: List
        },
        children: [
          {
            path: '/userlist',
            name: 'userlist',
            component: () => import('../views/home/childrens/UserList.vue'),
            meta: {
              title: "住户信息列表",
              classifyTitle: "住户信息"
            }
          },
          {
            path: '/userupdate',
            name: 'userupdate',
            component: () => import('../views/home/childrens/UserUpdate.vue'),
            meta: {
              title: "住户信息修改",
              classifyTitle: "住户信息"
            }
          },
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
