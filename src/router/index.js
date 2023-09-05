import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import store from "../store/index";
import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () =>
          import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: '/task',
        name: 'Task',
        redirect: '/task/view',
      },
      {
        path: '/task/view',
        name: 'ViewTask',
        component: () => import('@/views/task/ViewTask.vue'),
      },
     
  
     
     
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/pages/Login'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach(async (to, from,next) => {
 
  await store.dispatch("login/checkAuth", null);
  if (to.path == "/pages/login") {
    return next();
  } else {
    if ((await store.state.login.checkAuthStat) == true) {
      return next();
    } else {
      return next("/pages/login");
    }
  }
   
})

export default router
