import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: SignUpView
    },
    {
      path: '/todo',
      name: 'todo',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: TodoView,
      meta: { requiresAuth: true }
    },
    {
      path: '/todo/:itemId',
      name: 'todoDetail',
      props: true, // パラメータをプロパティとしてコンポーネントに渡す
      component: TodoDetailView,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // セッションチェック用のAPIを呼び出し
    try {
      const isValid = await checkSession()
      if (isValid) {
        next() // セッションが有効ならルートに進む
      } else {
        next({ path: '/login', replace: true }) // TODO：ログアウト後、ブラウザの戻るボタンを押すと、ログインページが表示されるが、URLが/loginにならない
      }
    } catch {
      next({ path: '/login', replace: true }) // API呼び出しに失敗した場合もログインページにリダイレクト
    }
  } else {
    next() // 認証が不要なページはそのまま進む
  }
})

async function checkSession() {
  try {
    const res = await fetch('/api/user')
    // const json = await res.json()
    return res.ok
  } catch {
    return false
  }
}

export default router
