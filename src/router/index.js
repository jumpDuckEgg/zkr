import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/bidding/index',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    hidden: true,
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },
  {
    path: '/bidding',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'bidding',
        component: () => import('@/views/bidding/index'),
        meta: { title: '投标管理', icon: 'feiji' }
      }
    ]
  },
  {
    path: '/contract',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'contract',
        component: () => import('@/views/contract/index'),
        meta: { title: '合同管理', icon: 'survey' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'record',
        component: () => import('@/views/record/index'),
        meta: { title: '备案管理', icon: 'gonglue' }
      }
    ]
  },
  {
    path: '/achievement',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'achievement',
        component: () => import('@/views/achievement/index'),
        meta: { title: '业绩管理', icon: 'all' }
      }
    ]
  },
  {
    path: '/personManager',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'personManager',
        component: () => import('@/views/personManager/index'),
        meta: { title: '人员管理', icon: 'personal-center' }
      }
    ]
  },
  {
    path: '/file',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'file',
        component: () => import('@/views/file/index'),
        meta: { title: '文件管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'user',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'bussiness-man' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

