<template>
  <div class="msite">
    <!--首页头部-->
    <header-top :address="addressObj.address">
      <template #left>
        <a class="header_search">
          <i class="iconfont icon-sousuo"></i>
        </a>
      </template>
      <template #right v-if="!loginData._id">
        <a class="header_login" @click="$router.push('/login')">
          <span class="header_login_text">登录|注册</span>
        </a>
      </template>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categoryArr, index) in categoryArrs" :key="index">
            <a
              href="javascript:"
              class="link_to_food"
              v-for="(item, index) in categoryArr"
              :key="index"
            >
              <div class="food_container">
                <img :src="imgBaseUrl+item.image_url" />
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <div class="shop_container" ref="shopContainer">
        <ul class="shop_list">
          <li
            class="shop_li border-1px"
            v-for="(shop, index) in shops"
            :key="index"
            @click="$router.replace(`/merchant/${shop.id}`)"
          >
            <a>
              <div class="shop_left">
                <img class="shop_img" :src="imgBaseUrl+shop.image_path" />
              </div>
              <div class="shop_right">
                <section class="shop_detail_header">
                  <h4 class="shop_title">{{shop.name}}</h4>
                  <ul class="shop_detail_ul">
                    <li
                      class="supports"
                      v-for="(item, index) in shop.supports"
                      :key="index"
                    >{{item.icon_name}}</li>
                  </ul>
                </section>
                <section class="shop_rating_order">
                  <section class="shop_rating_order_left">
                    <ele-star class="star star-24" :size="24" :score="shop.rating" :mr="2"></ele-star>
                    <div class="rating_section">{{shop.rating}}</div>
                    <div class="order_section">月售{{shop.recent_order_num}}单</div>
                  </section>
                  <section class="shop_rating_order_right">
                    <span
                      class="delivery_style delivery_left"
                      v-if="shop.delivery_mode"
                    >{{shop.delivery_mode.text}}</span>
                    <span class="delivery_style delivery_right">准时达</span>
                  </section>
                </section>
                <section class="shop_distance">
                  <p class="shop_delivery_msg">
                    <span>¥{{shop.float_minimum_order_amount}}起送</span>
                    <span class="segmentation">/</span>
                    <span v-show="shop.piecewise_agent_fee">{{shop.piecewise_agent_fee.tips}}</span>
                  </p>
                </section>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
// import { Toast } from "vant";
import "swiper/css/swiper.min.css";
import { mapActions, mapState } from "vuex";
import { GET_ADDRESS, GET_CATEGORIES, GET_SHOPS } from "store/mutation_types";

export default {
  name: "Msite",
  computed: {
    // ...mapState([
    //   "imgBaseUrl",
    //   "addressObj",
    //   "categories",
    //   "shops",
    //   "loginData"
    // ]),
    ...mapState({
      imgBaseUrl: state => state.wrap.imgBaseUrl,
      addressObj: state => state.wrap.addressObj,
      categories: state => state.wrap.categories,
      shops: state => state.wrap.shops,
      loginData: state => state.wrap.loginData
    }),
    categoryArrs() {
      return this._.chunk(this.categories, 8);
    }
  },
  async mounted() {
    // try {
    await this[GET_ADDRESS]();
    await this[GET_CATEGORIES]();
    await this[GET_SHOPS]();

    // 暂时不用这种方式处理切换到获取分类和商品的路由时未获得相关信息不进行跳转到登录页的问题
    // } catch (error) {
    // Toast.fail({
    //   message: '登录超时，请重新登录',
    //   duration: 2000,
    //   onClose: () => {
    //     this.$router.replace("/login");
    //   }
    // });
    // }

    this.renderSwiper();
    this.initShopContainer();
  },
  methods: {
    ...mapActions([GET_ADDRESS, GET_CATEGORIES, GET_SHOPS]),
    renderSwiper() {
      this.$nextTick(() => {
        new Swiper(".swiper-container", {
          loop: true, // 循环模式选项

          // 如果需要分页器
          pagination: {
            el: ".swiper-pagination"
          }
        });
      });
    },
    initShopContainer() {
      this.$nextTick(() => {
        this.$refs.shopContainer &&
          new this.BScroll(this.$refs.shopContainer, {
            bounce: false,
            click:true
          });
      });
    }
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.msite {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .msite_nav {
    bottom-border-1px(#e4e4e4);
    margin-top: 45px;
    height: 200px;
    background: #fff;

    .swiper-container {
      width: 100%;
      height: 100%;

      .swiper-wrapper {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-wrap: wrap;

          .link_to_food {
            width: 25%;

            .food_container {
              display: block;
              width: 100%;
              text-align: center;
              padding-bottom: 10px;
              font-size: 0;

              img {
                display: inline-block;
                width: 50px;
                height: 50px;
              }
            }

            span {
              display: block;
              width: 100%;
              text-align: center;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }

      .swiper-pagination {
        >span.swiper-pagination-bullet-active {
          background: #02a774;
        }
      }
    }
  }

  .msite_shop_list {
    top-border-1px(#e4e4e4);
    position: absolute;
    left: 0;
    right: 0;
    top: 245px;
    bottom: 47px;
    margin-top: 10px;
    background: #fff;

    .shop_header {
      padding: 10px 10px 0 10px;

      .shop_icon {
        margin-left: 5px;
        color: #999;
      }

      .shop_header_title {
        color: #999;
        font-size: 14px;
        line-height: 20px;
      }
    }

    .shop_container {
      position: absolute;
      left: 0;
      right: 0;
      top: 30px;
      bottom: 0;
      overflow: hidden;

      .shop_list {
        .shop_li {
          bottom-border-1px(#f1f1f1);
          width: 100%;

          >a {
            clearFix();
            display: block;
            box-sizing: border-box;
            padding: 15px 8px;
            width: 100%;

            .shop_left {
              float: left;
              box-sizing: border-box;
              width: 23%;
              height: 75px;
              padding-right: 10px;

              .shop_img {
                display: block;
                width: 100%;
                height: 100%;
              }
            }

            .shop_right {
              float: right;
              width: 77%;

              .shop_detail_header {
                clearFix();
                width: 100%;

                .shop_title {
                  text_ellipsis();
                  float: left;
                  width: 200px;
                  color: #333;
                  font-size: 16px;
                  line-height: 16px;
                  font-weight: 700;

                  &::before {
                    content: '品牌';
                    display: inline-block;
                    font-size: 11px;
                    line-height: 11px;
                    color: #333;
                    background-color: #ffd930;
                    padding: 2px 2px;
                    border-radius: 2px;
                    margin-right: 5px;
                  }
                }

                .shop_detail_ul {
                  float: right;
                  margin-top: 3px;

                  .supports {
                    float: left;
                    font-size: 10px;
                    color: #999;
                    border: 1px solid #f1f1f1;
                    padding: 0 2px;
                    border-radius: 2px;
                  }
                }
              }

              .shop_rating_order {
                clearFix();
                width: 100%;
                margin-top: 18px;
                margin-bottom: 8px;

                .shop_rating_order_left {
                  float: left;
                  color: #ff9a0d;

                  .star { // 2x图 3x图
                    float: left;
                    font-size: 0;

                    .star-item {
                      display: inline-block;
                      background-repeat: no-repeat;
                    }

                    &.star-48 {
                      .star-item {
                        width: 20px;
                        height: 20px;
                        margin-right: 22px;
                        background-size: 20px 20px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('../images/stars/star48_on');
                        }

                        &.half {
                          bg-image('../images/stars/star48_half');
                        }

                        &.off {
                          bg-image('../images/stars/star48_off');
                        }
                      }
                    }

                    &.star-36 {
                      .star-item {
                        width: 15px;
                        height: 15px;
                        margin-right: 6px;
                        background-size: 15px 15px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('../images/stars/star36_on');
                        }

                        &.half {
                          bg-image('../images/stars/star36_half');
                        }

                        &.off {
                          bg-image('../images/stars/star36_off');
                        }
                      }
                    }

                    &.star-24 {
                      .star-item {
                        width: 10px;
                        height: 10px;
                        margin-right: 3px;
                        background-size: 10px 10px;

                        &:last-child {
                          margin-right: 0;
                        }

                        &.on {
                          bg-image('../images/stars/star24_on');
                        }

                        &.half {
                          bg-image('../images/stars/star24_half');
                        }

                        &.off {
                          bg-image('../images/stars/star24_off');
                        }
                      }
                    }
                  }

                  .rating_section {
                    float: left;
                    font-size: 10px;
                    color: #ff6000;
                    margin-left: 4px;
                  }

                  .order_section {
                    float: left;
                    font-size: 10px;
                    color: #666;
                    transform: scale(0.8);
                  }
                }

                .shop_rating_order_right {
                  float: right;
                  font-size: 0;

                  .delivery_style {
                    transform-origin: 35px 0;
                    transform: scale(0.7);
                    display: inline-block;
                    font-size: 12px;
                    padding: 1px;
                    border-radius: 2px;
                  }

                  .delivery_left {
                    color: #fff;
                    margin-right: -10px;
                    background-color: #02a774;
                    border: 1px solid #02a774;
                  }

                  .delivery_right {
                    color: #02a774;
                    border: 1px solid #02a774;
                  }
                }
              }

              .shop_distance {
                clearFix();
                width: 100%;
                font-size: 12px;

                .shop_delivery_msg {
                  float: left;
                  transform-origin: 0;
                  transform: scale(0.9);
                  width: 200px;
                  color: #666;
                }

                .segmentation {
                  color: #ccc;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
