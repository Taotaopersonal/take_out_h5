import Mock from 'mockjs'
import data from './data'
Mock.mock('/api/seller',{code:200,data:data.seller})
Mock.mock('/api/goods',{code:200,data:data.goods})
Mock.mock('/api/ratings',{code:200,data:data.ratings})