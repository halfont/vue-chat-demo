import Vue from 'vue'
import VueRouter from 'vue-router'
import GroupSelect from '../views/GroupSelect.vue'
import ChatRoom from '../views/ChatRoom.vue'
import Register from '../views/Register.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '*',
    name: 'GroupSelect',
    component: GroupSelect
  },
  {
    path: '/chat/:roomId',
    name: 'ChatRoom',
    component: ChatRoom
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'is-active'
})

export default router
