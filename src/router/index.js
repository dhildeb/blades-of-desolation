import { createRouter, createWebHistory } from 'vue-router'
import BattleField from '../views/BattleField.vue'
import BadPageDefault from '../views/BadPageDefault.vue'
import CharacterForm from '@/views/CharacterForm.vue'
import $store from '@/store/index.js'
import Notify from "@/utils/Notify"

const routes = [
  {
    path: '/battle',
    name: 'battleField',
    component: BattleField,
    beforeEnter: function(){
      if($store.state.player.characters.length == 0){
        Notify.toast('You cannot battle without a party.', 'warning')
        router.push({name: 'CharacterForm'})
      }
    }
  },
  {
    path: '/',
    name: 'CharacterForm',
    component: CharacterForm
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/map',
    name: 'MapLocation',
    component: () => import(/* webpackChunkName: "about" */ '../views/Map.vue')
  },
  {
    path: '/location',
    name: 'AreaLocation',
    component: () => import(/* webpackChunkName: "about" */ '../components/AreaLocation.vue'),
    beforeEnter: function(){
      if($store.state.player.characters.length == 0){
        Notify.toast('You cannot shop without a party.', 'warning')
        router.push({name: 'CharacterForm'})
      }
    }
  },
  {
    path: '/shop',
    name: 'MainShop',
    component: () => import(/* webpackChunkName: "about" */ '../views/MainShop.vue'),
    beforeEnter: function(){
      if($store.state.player.characters.length == 0){
        Notify.toast('You cannot shop without a party.', 'warning')
        router.push({name: 'CharacterForm'})
      }
    }
  },
  {
    path: '/:any(.*)',
    component: BadPageDefault
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
