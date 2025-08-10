<template>
  <div class="index-component discount">
    <div class="header">
      <div class="count-down">
        <span class="title">限时优惠</span>
        <span class="time">00:00</span>
      </div>
      <div class="browser">
        <span>更多</span>
        <img class="chevron-right" src="@/static/chevron-right.svg" alt="" />
      </div>
    </div>
    <view class="body">
      <scroll-view class="shop-list" scroll-x="true">
        <div class="shop-item">
          <img class="img" src="@/static/breakfast-shop.png" alt="" />
          <div class="shop-info">
            <div class="shop-name">早餐店</div>
            <div class="shop-desc">早餐店的介绍</div>
            <div class="shop-discount">
              <img class="img" src="@/static/gift.svg" alt="">
              <span>限时特惠 <span class="price">20</span></span>
            </div>
          </div>
        </div>
        <div class="shop-item">
          <img class="img" src="@/static/pizza.png" alt="" />
          <div class="shop-info">
            <div class="shop-name">披萨店</div>
            <div class="shop-desc">披萨店的介绍</div>
            <div class="shop-discount">
              <img class="img" src="@/static/gift.svg" alt="">
              <span>限时特惠 <span class="price">20</span></span>
            </div>
          </div>
        </div>
      </scroll-view>
    </view>
  </div>
</template>

<script setup>

</script>

<style scoped lang="scss">
  @use '@/styles/colors.scss';

  .discount {

    .header {

      .count-down {
        display: flex;
        align-items: center;

        .time {
          border-radius: 8px;
          padding: 4px 8px 4px 8px;
          margin-left: 8px;
          color: colors.$Gray-90;
          font-size: 10px;
          font-weight: 400;
          line-height: 14px;
          background: colors.$Secondary-100;
        }
      }
    }

    .shop-list {
      width: 100%;
      white-space: nowrap;

      .shop-item {
        display: inline-flex;
        align-items: center;

        .img {
          height: 96px;
          width: 96px;
          border-radius: 12px;
          overflow: hidden;
          object-fit: scale-down;
        }

        .shop-info {
          margin-left: 16px;

          .shop-name {
            color: colors.$Gray-90;
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
          }

          .shop-desc,
          .shop-discount {
            color: colors.$Gray-70;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }

          .shop-discount {
            margin-top: 8px;
            color: colors.$Primary-125;

            .img {
              height: 16px;
              width: 16px;
              margin-right: 4px;
              vertical-align: bottom;
            }

            .price {
              color: colors.$Gray-90;

              &::before {
                content: '￥';
              }
            }
          }
        }

        &+.shop-item {
          margin-left: 16px;
        }
      }
    }
  }
</style>