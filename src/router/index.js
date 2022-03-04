import { createRouter, createWebHistory } from 'vue-router'
import BattleField from '../views/BattleField.vue'
import BadPageDefault from '../views/BadPageDefault.vue'

const routes = [
  {
    path: '/',
    name: 'battleField',
    component: BattleField
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
    path: '/shop',
    name: 'shop',
    component: () => import(/* webpackChunkName: "shop" */ '../views/GeneralShop.vue'),
    children: [
      {path: 'cards', component: () => import(/* webpackChunkName: "cards" */ '../components/CardShop.vue')},
      {path: 'abilities', component: () => import(/* webpackChunkName: "abilities" */ '../components/AbilitiesShop.vue')}
    ]
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
