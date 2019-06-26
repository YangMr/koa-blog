import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
		{
			path : "/signup",
			name : "signup",
			component : Signup
		},
		{
			path : "/signin",
			name : "signin",
			component : Signin
		}
  ]
})
