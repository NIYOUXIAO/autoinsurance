import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import main from '@/components/main'
import accident from '@/components/accident'
import dispatching from '@/components/dispatching'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'login',
			component: login
		},
		{
			path: '/main',
			name: 'main',
			component: main,
			children: [{
				path: '/accident',
				name: 'accident',
				component: accident
			},
			{
				path: '/dispatching',
				name: 'dispatching',
				component: dispatching
			}]
		}
	]
})
