import Seller from 'pages/seller.vue'
import Goods from 'pages/goods.vue'
import Ratings from 'pages/ratings.vue'
export default [{
    path: '/api/goods',
    component: Goods
  },
  {
    path: '/api/seller',
    component: Seller
  }, {
    path: '/api/ratings',
    component: Ratings
  },
  {
    path: '/',
    redirect: '/api/goods'
  }
]