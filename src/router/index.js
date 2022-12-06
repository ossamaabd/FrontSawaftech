import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListProducts from '../views/Products/ListProducts.vue'
import CreateProductpage from '../views/Products/CreateProductpage.vue'
import UpdateProductpage from '../views/Products/UpdateProductpage.vue'

import ListOrders from '../views/Orders/ListOrders.vue'
import CreateOrderpage from '../views/Orders/CreateOrderpage.vue'
import UpdateOrderpage from '../views/Orders/UpdateOrderpage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Products/ListProducts',
    name: 'ListProducts',
    component: ListProducts
  },
  {
    path: '/Products/CreateProductpage',
    name: 'CreateProductpage',
    component: CreateProductpage
  },
  {
    path: '/Products/UpdateProductpage/:id',
    name: 'UpdateProductpage',
    component: UpdateProductpage
  },
//orders
  {
    path: '/Orders/ListOrders',
    name: 'ListOrders',
    component: ListOrders
  },
  {
    path: '/Orders/CreateOrderpage',
    name: 'CreateOrderpage',
    component: CreateOrderpage
  },
  {
    path: '/Orders/UpdateOrderpage/:id',
    name: 'UpdateOrderpage',
    component: UpdateOrderpage
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
