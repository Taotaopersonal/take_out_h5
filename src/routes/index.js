// import Seller from 'pages/route-seller/seller.vue'
// import Goods from 'pages/route-goods/goods.vue'
// import Ratings from 'pages/route-ratings/ratings.vue'
// import Msite from 'pages/route-msite/msite.vue'
// import Search from 'pages/route-search/search.vue'
// import Order from 'pages/route-order/order.vue'
// import Profile from 'pages/route-profile/profile.vue'
// import Login from 'pages/route-login/login.vue'
// import UserDetail from 'pages/route-user_detail/user_detail.vue'
// import Merchant from 'pages/route-merchant/merchant.vue'


const Seller = () => import( /*webpackChunkName:"Seller"*/ 'pages/route-seller/seller.vue')
const Goods = () => import( /*webpackChunkName:"Goods"*/ 'pages/route-goods/goods.vue')
const Ratings = () => import( /*webpackChunkName:"Ratings"*/ 'pages/route-ratings/ratings.vue')
const Msite = () => import( /*webpackChunkName:"Msite"*/ 'pages/route-msite/msite.vue')
const Search = () => import( /*webpackChunkName:"Search"*/ 'pages/route-search/search.vue')
const Order = () => import( /*webpackChunkName:"Order"*/ 'pages/route-order/order.vue')
const Profile = () => import( /*webpackChunkName:"Profile"*/ 'pages/route-profile/profile.vue')
const Login = () => import( /*webpackChunkName:"Login"*/ 'pages/route-login/login.vue')
const UserDetail = () => import( /*webpackChunkName:"UserDetail"*/ 'pages/route-user_detail/user_detail.vue')
const Merchant = () => import( /*webpackChunkName:"Merchant"*/ 'pages/route-merchant/merchant.vue')

import store from 'store'

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
    },
    beforeEnter: (to, from, next) => {
      if (store.state.wrap.loginData._id) {
        next('/')
      } else {
        next()
      }
    }
  },
  {
    path: '/userDetail',
    component: UserDetail,
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
