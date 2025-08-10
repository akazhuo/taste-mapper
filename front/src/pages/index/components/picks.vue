<script lang="ts" setup>

</script>

<template>
  <view class="index-component top-picks">
    <view class="header">
      <view class="title">精选</view>
      <view class="browser">
        <text>更多</text>
        <img class="chevron-right" src="@/static/chevron-right.svg" alt="" />
      </view>
    </view>
    <view class="body">
      <view class="test">
        <view class="test-item"></view>
        <view class="test-item"></view>
        <view class="test-item"></view>
      </view>
      <scroll-view class="picks-list" scroll-x="true">
        <view class="picks-item">
          <image class="pi-img" src="@/static/muffin.png" alt="" mode="aspectFill" />
          <view class="tag">
            <image class="tag-img" src="@/static/tag.svg" alt="" mode="widthFix" />
            <text class="tag-text">热销</text>
          </view>
          <view class="pi-title">河内松饼店</view>
          <view class="pi-content">
            <view class="content-item delivery-times">
              <img class="icon" src="@/static/clock.svg" alt="" mode="widthFix">
              <text class="text">16 min</text>
            </view>
            <view class="content-item distance">
              <img class="icon" src="@/static/navigation.svg" alt="" mode="widthFix">
              <text class="text">5 km</text>
            </view>
          </view>
        </view>
        <view class="picks-item">
          <image class="pi-img" src="@/static/coffee2.png" alt="" mode="aspectFill" />
          <view class="tag truck">
            <image class="tag-img" src="@/static/truck.svg" alt="" mode="widthFix" />
            <text class="tag-text">热销</text>
          </view>
          <view class="pi-title">街角咖啡店店</view>
          <view class="pi-content">
            <view class="content-item delivery-times">
              <img class="icon" src="@/static/clock.svg" alt="" mode="widthFix">
              <text class="text">16 min</text>
            </view>
            <view class="content-item distance">
              <img class="icon" src="@/static/navigation.svg" alt="" mode="widthFix">
              <text class="text">5 km</text>
            </view>
          </view>
        </view>
        <view class="picks-item">
          <image class="pi-img" src="@/static/pizza2.webp" alt="" mode="aspectFill" />
          <view class="tag">
            <image class="tag-img" src="@/static/tag.svg" alt="" mode="widthFix" />
            <text class="tag-text">热销</text>
          </view>
          <view class="pi-title">披萨店</view>
          <view class="pi-content">
            <view class="content-item delivery-times">
              <img class="icon" src="@/static/clock.svg" alt="" mode="widthFix">
              <text class="text">16 min</text>
            </view>
            <view class="content-item distance">
              <img class="icon" src="@/static/navigation.svg" alt="" mode="widthFix">
              <text class="text">5 km</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @use '@/styles/colors.scss';

  .top-picks {
    .picks-list {
      white-space: nowrap;

      .picks-item {
        display: inline-block;

        .pi-img {
          width: 140px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
        }

        .tag {
          display: flex;
          margin-top: 8px;
          color: colors.$Primary-125;
          align-items: center;

          .tag-img {
            width: 16px;
          }

          .tag-text {
            margin-left: 4px;
            font-size: 12px;
            font-weight: 400;
            line-height: 16px;
          }

          &.truck {
            color: colors.$Tertiary-Green;
          }
        }

        .pi-title {
          margin-top: 4px;
          font-size: 16px;
          font-weight: 400;
          line-height: 24px;
          color: colors.$Gray-90;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .pi-content {
          display: flex;
          margin-top: 4px;
          justify-content: space-between;

          .content-item {
            display: flex;
            align-items: center;

            .icon {
              width: 16px;
            }

            .text {
              margin-left: 4px;
              font-size: 12px;
              font-weight: 400;
              line-height: 16px;
              color: colors.$Gray-70;
            }
          }
        }

        &+.picks-item {
          margin-left: 16px;
        }
      }
    }
  }
</style>