import store from '@/store'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/forum'
  },
  {
    path: '/',
    redirect: '/forum',
    component: () => import(/* webpackChunkName: "loggedInWrapper" */ '../views/LoggedInWrapper.vue'),
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'forum',
        name: 'forum',
        component: () => import(/* webpackChunkName: "forum" */ '../views/Forum.vue')
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () =>
      import(/* webpackChunkName: "user" */ '../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// redirect unauthed user to login
router.beforeEach((to) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)

  const lsUser = window.localStorage.getItem('user')

  if (lsUser) {
    const user = JSON.parse(lsUser)
    store.commit('setCurrentUser', user)
  }

  if (authRequired && !store.getters.currentUser?.id) {
    return '/login'
  }
})

export default router
