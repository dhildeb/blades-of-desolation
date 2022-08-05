import { createRouter, createWebHistory } from 'vue-router'
import BattleField from '../views/BattleField.vue'
import BadPageDefault from '../views/BadPageDefault.vue'
import CharacterForm from '@/views/CharacterForm.vue'
import MagicShop from '@/views/MagicShop.vue'
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
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
    component: () => import(/* webpackChunkName: "about" */ '../components/AreaLocation.vue')
  },
  {
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/GeneralShop.vue'),
    beforeEnter: function(){
      if($store.state.player.characters.length == 0){
        Notify.toast('You cannot shop without a party.', 'warning')
        router.push({name: 'CharacterForm'})
      }
    }
  },
  {
    path: '/shop/sell',
    name: 'SellShop',
    component: () => import(/* webpackChunkName: "SellShop" */ '../views/SellShop.vue'),
    beforeEnter: function(){
      if($store.state.player.characters.length == 0){
        Notify.toast('You cannot shop without a party.', 'warning')
        router.push({name: 'CharacterForm'})
      }
    }
  },
  {
    path: '/shop/magic',
    name: 'MagicShop',
    component: MagicShop,
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
// router.afterEach((to) => {
//   to.meta.transition = to.matched.length == 1 ? 'bounce-right' : 'bounce-left'
// })

export default router
