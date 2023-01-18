import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import EnterScreen from '../views/EnterScreen.vue'

const routes = [
	{
		path: '/',
		name: 'home',
		component: EnterScreen
	},
	{
		path: '/signup',
		name: 'signup',
		component: function () {
			return import('../views/SignUp.vue')
		}
	},
	{
		path: '/signin',
		name: 'signin',
		component: function () {
			return import('../views/SignIn.vue')
		}
	},
	{
		path: '/main',
		name: 'main',
		meta: {
			auth: true
		},
		component: function () {
			return import('../views/MainPage.vue')
		}
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

router.beforeEach((to, from, next) => {
	if (to.meta.auth && store.getters['auth/isAuth']) {
		next()
	} else if (to.meta.auth && !store.getters['auth/isAuth']) {
		next('/signin')
	} else {
		next()
	}
})

export default router
