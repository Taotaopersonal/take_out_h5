<template>
  <div class="goods">
    <div class="typeWrap" ref="typeWrap">
      <ul class="typeList" ref="typeList">
        <li
          class="type"
          :class="{active:currentIndex === index}"
          v-for="(good,index) in goods"
          :key="index"
          @click="handleC(index)"
        >
          <ele-icon v-show="good.type >= 0" class="icon" :icon-size="3" :type="good.type"></ele-icon>
          <span>{{good.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foodWrap" ref="foodWrap">
      <ul class="foodList" ref="foodList">
        <li class="food" v-for="(good,index) in goods" :key="index">
          <h2 class="goodName">{{good.name}}</h2>
          <ele-goodItem :good-foods="good.foods"></ele-goodItem>
        </li>
      </ul>
    </div>
    <ele-goodCart :currentSelectItems="currentSelectItems" @clear="clear"></ele-goodCart>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { GET_GOODS } from "store/mutation_types";
import GoodItem from "components/ele-goods_goodItem/ele-goods_goodItem.vue";
import GoodCart from "components/ele-goods_goodCart/ele-goods_goodCart.vue";
export default {
  name: "Goods",
  components: {
    "ele-goodItem": GoodItem,
    "ele-goodCart": GoodCart
  },
  data() {
    return {
      currentIndex: 0,
      topLocationArr: [] //记录右侧列表滑到每一项时的位置信息,
    };
  },
  methods: {
    ...mapActions([GET_GOODS]),
    initTopLocationArr() {
      this.$nextTick(() => {
        let foodList = this.$refs.foodList;
        if (foodList.children) {
          let foods = foodList.children;
          Array.from(foods).reduce((adder, item) => {
            this.topLocationArr.push(adder);
            return adder + item.offsetHeight;
          }, 0);
        }
      });
    },
    initTypeScroll() {
      this.typeBS = new this.BScroll(this.$refs.typeWrap, {
        bounce: false,
        click:true
      });
    },
    initFoodScroll() {
      this.foodBS = new this.BScroll(this.$refs.foodWrap, {
        bounce: false,
        click:true,
        probeType: 3
      });
      this.foodBS.on("scroll", this.onScroll);
      this.foodBS.on("scrollEnd", this.onScrollEnd);
    },
    onScroll({ y }) {
      if (this.flag) return;
      y = Math.abs(y);
      let index = this.topLocationArr.findIndex((item, index) => {
        if (index === this.topLocationArr.length - 1)
          return this.topLocationArr[this.topLocationArr.length - 1];
        return y >= item && y <= this.topLocationArr[index + 1];
      });
      // 如果index没有改变，为了提高性能，不应该进行一下的逻辑
      if (this.currentIndex === index) return;
      if (this.$refs.typeList) {
        this.typeBS.scrollToElement(
          Array.from(this.$refs.typeList.children)[index]
        );
      }
      this.currentIndex = index;
    },
    handleC(index) {
      this.flag = true;
      this.currentIndex = index;
      this.foodBS.scrollTo(0, -this.topLocationArr[index]);
    },
    onScrollEnd() {
      this.flag = false;
    },
    add(item) {
      if (!item.count) {
        this.$set(item, "count", 1);
      } else {
        item.count++;
      }
    },
    remove(item) {
      item.count--;
    },
    clear() {
      this.goods.forEach(good => {
        good.foods.forEach(item => {
          if (item.count) {
            item.count = 0;
          }
        });
      });
    }
  },
  computed: {
    // ...mapState(["goods"]),
    ...mapState({
      goods: state => state.merchant.goods
    }),
    currentSelectItems() {
      let currentSelectItems = [];
      this.goods.forEach(good => {
        good.foods.forEach(item => {
          if (item.count) {
            currentSelectItems.push(item);
          }
        });
      });
      return currentSelectItems;
    }
  },
  async mounted() {
    await this[GET_GOODS]();
    this.initTypeScroll();
    this.initFoodScroll();
    this.initTopLocationArr();

    this.$bus.$off();
    this.$bus.$on("add", item => {
      this.add(item);
    });
    this.$bus.$on("remove", item => {
      this.remove(item);
    });
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.goods {
  position: absolute;
  display: flex;
  left: 0;
  right: 0;
  top: 178px;
  bottom: 46px;

  .typeWrap {
    width: 80px;
    overflow: hidden;

    .typeList {
      .type {
        center();
        padding: 0 12px;
        height: 54px;
        font-size: 12px;
        color: grey;
        line-height: 14px;
        one-px(rgba(7, 17, 27, 0.1));
        background-color: #f3f5f7;

        &.active {
          background-color: #ffffff;
        }

        &:last-child {
          border-none();
        }

        &:after {
          width: 80%;
          left: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }

  .foodWrap {
    flex: 1;
    overflow: hidden;

    .foodList {
      .food {
        .goodName {
          height: 26px;
          padding-left: 14px;
          border-left: 2px solid #d9dde1;
          background-color: #f3f5f7;
          font-size: 12px;
          color: rgba(147, 153, 159, 1);
          line-height: 26px;
        }
      }
    }
  }
}
</style>
