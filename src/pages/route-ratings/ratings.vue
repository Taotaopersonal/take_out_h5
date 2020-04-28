<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <ele-star class="star" :size="36" :score="seller.serviceScore" :mr="3"></ele-star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <ele-star class="star" :size="36" :score="seller.foodScore" :mr="3"></ele-star>
            <span class="score">4.6</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <ele-split class="split"></ele-split>

      <ele-select
        :type="type"
        :hasText="hasText"
        :ratings="ratings"
        @select="select"
        @switchText="switchText"
      ></ele-select>

      <div class="rating-wrapper">
        <ul>
          <li class="rating-item" v-for="(item,index) in filterRatings" :key="index">
            <div class="avatar">
              <img width="28" height="28" :src="item.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{item.username}}</h1>
              <div class="star-wrapper">
                <ele-star class="star" :size="24" :score="item.score" :mr="3"></ele-star>
                <span class="delivery">{{item.deliveryTime || 0}}分钟送达</span>
              </div>
              <p class="text">{{item.text}}</p>
              <div class="recommend">
                <span :class="item.rateType===0?`icon-thumb_up`:`icon-thumb_down`"></span>
              </div>
              <div class="time">{{item.rateTime | dateString}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { GET_RATINGS } from "store/mutations_type";
import Select from "components/ele-select/ele-select.vue";
export default {
  name: "Ratings",
  data() {
    return {
      type: 2, //需要查看的评论的类型,2:全部 0:推荐 1:吐槽
      hasText: false //查看的评价是否需要携带内容 true:必须拥有内容 false:不要求有内容
    };
  },
  components: {
    "ele-select": Select
  },
  computed: {
    ...mapState(["seller", "ratings"]),
    filterRatings() {
      return this.ratings.filter(item => {
        return (
          (this.type === 2 || item.rateType === this.type) &&
          (!this.hasText || item.text.length > 0)
        );
      });
    }
  },
  methods: {
    ...mapActions([GET_RATINGS]),
    select(type) {
      this.type = type;
    },
    switchText() {
      this.hasText = !this.hasText;
    }
  },
  async mounted() {
    await this[GET_RATINGS]();
    this.$nextTick(() => {
      new this.BScroll(this.$refs.ratings, {
        bounce: false
      });
    });
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.ratings {
  position: absolute;
  top: 175px;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background: #fff;

  .overview {
    display: flex;
    padding: 18px 0;

    .overview-left {
      flex: 0 0 137px;
      padding: 6px 0;
      width: 137px;
      border-right: 1px solid rgba(7, 17, 27, 0.1);
      text-align: center;

      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }

      .score {
        margin-bottom: 6px;
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }

      .title {
        margin-bottom: 8px;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7, 17, 27);
      }

      .rank {
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
      }
    }

    .overview-right {
      flex: 1;
      padding: 6px 0 6px 24px;

      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }

      .score-wrapper {
        display: flex;
        margin-bottom: 8px;
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .star {
          margin: 0 12px;
        }

        .score {
          line-height: 18px;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }

      .delivery-wrapper {
        font-size: 0;

        .title {
          line-height: 18px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }

        .delivery {
          margin-left: 12px;
          font-size: 12px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }

  .rating-wrapper {
    padding: 0 18px;

    .rating-item {
      one-px(rgba(7, 17, 27, 0.1));
      display: flex;
      padding: 18px 0;

      .avatar {
        flex: 0 0 28px;
        width: 28px;
        margin-right: 12px;

        img {
          border-radius: 50%;
        }
      }

      .content {
        position: relative;
        flex: 1;

        .name {
          margin-bottom: 4px;
          line-height: 12px;
          font-size: 10px;
          color: rgb(7, 17, 27);
        }

        .star-wrapper {
          display: flex;
          margin-bottom: 6px;
          font-size: 0;

          .star {
            margin-right: 6px;
          }

          .delivery {
            line-height: 12px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .text {
          margin-bottom: 8px;
          line-height: 18px;
          color: rgb(7, 17, 27);
          font-size: 12px;
        }

        .recommend {
          line-height: 16px;
          font-size: 0;

          .icon-thumb_up, .icon-thumb_down, .item {
            display: inline-block;
            margin: 0 8px 4px 0;
            font-size: 9px;
          }

          .icon-thumb_up {
            color: $yellow;
          }

          .icon-thumb_down {
            color: rgb(147, 153, 159);
          }

          .item {
            padding: 0 6px;
            border: 1px solid rgba(7, 17, 27, 0.1);
            border-radius: 1px;
            color: rgb(147, 153, 159);
            background: #fff;
          }
        }

        .time {
          position: absolute;
          top: 0;
          right: 0;
          line-height: 12px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
      }
    }
  }
}
</style>



