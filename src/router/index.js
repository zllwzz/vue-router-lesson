import Vue from 'vue'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import A from '../views/a.vue'
import B from '../views/b.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About,
    children: [
      {
        path: 'a',
        component: A
      },
      {
        path: 'b',
        component: B
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((from,to,next) => {
  // console.log(from,to,1)
  next()
})
router.beforeEach((from,to,next) => {
  // console.log(from,to,2)
  next()
})
router.beforeEach((from,to,next) => {
  // console.log(from,to,3)
  next()
})
export default router
