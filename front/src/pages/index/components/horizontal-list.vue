<script lang="ts" setup>
import type { Item } from '@/types/horizontal-list.d.ts';
const props = defineProps<{
  title: string,
  dataList: Item[]
}>()
console.log(props.dataList)
</script>
<template>
  <view class="index-component horizontal-list">
    <view class="header">
      <view class="title">{{ title }}</view>
      <view class="browser">
        <text>更多</text>
        <img class="chevron-right" src="@/static/chevron-right.svg" alt="" />
      </view>
    </view>
    <view class="body">
      <scroll-view class="list-content" scroll-x="true">
        <view class="list-item" v-for="(item, index) in dataList" :key="index">
          <image class="li-img" :src="item.thumb" alt="" mode="aspectFill" />
          <view class="tag">
            <image class="tag-img" :src="`/static/${item.tag.type}.svg`" alt="" mode="widthFix" />
            <text class="tag-text">{{ item.tag.title }}</text>
          </view>
          <view class="li-title">{{ item.name }}</view>
          <view class="li-content">
            <view class="content-item delivery-times">
              <img class="icon" src="@/static/clock.svg" alt="" mode="widthFix">
              <text class="text">{{ item.delivery.times }} min</text>
            </view>
            <view class="content-item distance">
              <img class="icon" src="@/static/navigation.svg" alt="" mode="widthFix">
              <text class="text">{{ item.delivery.distance }} km</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  @use '@/styles/colors.scss';

  .horizontal-list {
    white-space: nowrap;
  
    .list-item {
      display: inline-block;
  
      .li-img {
        width: 140px;
        height: 140px;
        border-radius: 12px;
        overflow: hidden;
      }
  
      .tag {
        display: flex;
        margin-top: 8px;
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
        
        &.hot {
          color: colors.$Primary-125;
        }
  
        &.truck,
        &.trending {
          color: colors.$Tertiary-Green;
        }
        
        &.thumbs-up {
          color: colors.$Tertiary-Yellow;
        }
    
      }
  
      .li-title {
        margin-top: 4px;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: colors.$Gray-90;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
  
      .li-content {
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
  
      &+.list-item {
        margin-left: 16px;
      }
    }
  }
</style>