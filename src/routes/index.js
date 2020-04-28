import Seller from 'pages/route-seller/seller.vue'
import Goods from 'pages/route-goods/goods.vue'
import Ratings from 'pages/route-ratings/ratings.vue'
import Msite from 'pages/route-msite/msite.vue'
import Search from 'pages/route-search/search.vue'
import Order from 'pages/route-order/order.vue'
import Profile from 'pages/route-profile/profile.vue'
import Login from 'pages/route-login/login.vue'
import Merchant from 'pages/route-merchant/merchant.vue'
export default [{
    path: '/msite',
    component: Msite,
    meta: {
      showFooter: true
    },
  },
  {
    path: '/search',
    component: Search,
    meta: {
      showFooter: true
    },
  },
  {
    path: '/order',
    component: Order,
    meta: {
      showFooter: true
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      showFooter: true
    },
  },
  {
    path: '/login',
    component: Login,
    meta: {
      showFooter: false
    }
  },
  {
    path: "/merchant/:id",
    component: Merchant,
    meta: {
      showFooter: false
    },
    props: true,
    children: [{
        path: "api/goods",
        component: Goods
      },
      {
        path: "api/seller",
        component: Seller
      },
      {
        path: "api/ratings",
        component: Ratings
      },
      {
        path: "",
        redirect: 'api/goods',
      },
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
