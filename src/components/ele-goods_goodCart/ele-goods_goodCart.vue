<template>
  <div>
    <div class="cart">
      <div @click="foldFn" class="left" style="color: white">
        <div class="icon">
          <div class="logo" :class="{active:totalCount > 0}">
            <i class="layout-shopping_cart"></i>
          </div>
          <span class="qipao" v-show="totalCount > 0">{{totalCount}}</span>
        </div>
        <div class="totalPrice" :class="{active:totalPrice > 0}">
          <span>¥{{totalPrice}}</span>
        </div>
        <div class="deliveryPrice">
          <span>另需配送费¥{{seller.deliveryPrice}}元</span>
        </div>
      </div>
      <div class="right" :class="{active:totalPrice >= seller.minPrice}">
        <span @click="pay">{{accountText}}</span>
      </div>
    </div>
    <div class="list" v-show="showList">
      <div class="header">
        <span class="cartText">购物车</span>
        <span @click="clear" class="clear">清空</span>
      </div>
      <div class="content">
        <ul>
          <li class="item" v-for="(item,index) in currentSelectItems" :key="index">
            <span class="left">{{item.name}}</span>
            <div class="right">
              <span class="price">{{item.price * item.count}}</span>
              <ele-contorl class="contorl" :item="item"></ele-contorl>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" v-show="showList" @click="foldFn"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Contorl from "components/ele-goods_goodItem_control/ele-goods_goodItem_control.vue";
export default {
  name: "Cart",
  props: {
    currentSelectItems: Array
  },
  data() {
    return {
      isFold: true
    };
  },
  components: {
    "ele-contorl": Contorl
  },
  computed: {
    // ...mapState(["seller"]),
    ...mapState({
      seller: state => state.merchant.seller
    }),
    totalCount() {
      return this.currentSelectItems.reduce((acc, cur) => {
        return acc + cur.count;
      }, 0);
    },
    totalPrice() {
      return this.currentSelectItems.reduce((acc, cur) => {
        return acc + cur.price * cur.count;
      }, 0);
    },
    //购物车结算按钮的文案
    accountText() {
      if (this.totalPrice === 0) {
        return `¥${this.seller.minPrice}起送`;
      } else if (
        this.totalPrice > 0 &&
        this.totalPrice < this.seller.minPrice
      ) {
        return `差¥${this.seller.minPrice - this.totalPrice}起送`;
      } else {
        return `去结算`;
      }
    },
    showList() {
      if (this.totalCount === 0) {
        return false;
      }
      return !this.isFold;
    }
  },
  methods: {
    pay() {
      console.log("pay");
    },
    clear() {
      this.isFold = true;
      this.$emit("clear");
    },
    foldFn() {
      if (this.totalCount === 0) return;
      this.isFold = !this.isFold;
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.cart {
  flex: 0 0 0;
  position: fixed;
  z-index: 3;
  bottom: 0;
  left: 0;
  height: 46px;
  width: 100%;
  background: #141d27;
  display: flex;

  .left {
    flex: 1;
    height: 100%;
    display: flex;

    .icon {
      position: relative;
      bottom: 15px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #141d27;
      margin-left: 12px;
      margin-right: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);

        &.active {
          background: rgba(0, 160, 220, 1);

          i {
            color: white;
          }
        }

        i {
          color: rgba(255, 255, 255, 0.4);
        }
      }

      .qipao {
        position: absolute;
        right: 0;
        top: 5px;
        width: 24px;
        height: 16px;
        line-height: 16px;
        border-radius: 6px;
        background: red;
        font-size: 9px;
        font-weight: 700;
        text-align: center;
      }
    }

    .totalPrice {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 12px;
      font-size: 16px;
      line-height: 24px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);

      &.active {
        color: white;
      }
    }

    .deliveryPrice {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      line-height: 24px;
      font-weight: 700;
      color: rgba(255, 255, 255, 0.4);
      padding-left: 12px;
      border-left: 2px solid rgba(255, 255, 255, 0.1);
    }
  }

  .right {
    flex: 0 0 105px;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      background: green;

      span {
        color: white;
      }
    }

    span {
      color: rgba(255, 255, 255, 0.6);
    }
  }
}

.list {
  max-height: 255px;
  position: fixed;
  z-index: 2;
  left: 0;
  bottom: 46px;
  width: 100%;
  background: #f3f5f1;
  padding-bottom: 20px;

  .header {
    one-px(rgba(7, 17, 27, 0.1));
    height: 40px;
    background: #f3f5f7;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .cartText {
      margin-left: 18px;
      color: rgba(7, 17, 27, 1);
      font-weight: 800;
      font-size: 14px;
    }

    .clear {
      margin-right: 18px;
      color: rgba(0, 160, 220, 1);
      font-weight: 800;
      font-size: 14px;
    }
  }

  .content {
    max-height: 195px;
    overflow: hidden;

    .item {
      one-px(rgba(7, 17, 27, 0.1));
      display: flex;
      height: 48px;
      align-items: center;
      justify-content: space-between;

      .left {
        padding-left: 18px;
      }

      .right {
        display: flex;
        align-items: center;
        padding-right: 22px;

        .price {
          margin-right: 12px;
          color: rgba(240, 20, 20, 1);
          font-size: 10px;
          font-weight: 700;
        }
      }
    }
  }
}

.mask {
  position: fixed;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(7, 17, 27, 0.6);
  backdrop-filter: blur(5px);
}
</style>

