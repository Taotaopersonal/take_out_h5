import Seller from 'pages/route-seller/seller.vue'
import Goods from 'pages/route-goods/goods.vue'
import Ratings from 'pages/route-ratings/ratings.vue'
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
