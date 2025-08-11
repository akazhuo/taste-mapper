<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import bottomNav from '@/components/bottom-nav'

  const userInfo = reactive({
    head_pic: ''
  })
  const linearShadeStyle = ref('')
</script>
<template>
  <view class="member-page">
    <!-- 用户头部信息 -->
    <view class="page-block user-header" style="">
      <view class="block-row user-info-opt">
        <view class="user-info">
          <view class="ui-avatar" bindtap="handleTap" data-router="/pages/member/completeProfile">
            <image :src="userInfo.head_pic" mode="widthFix" alt="" class="img"></image>
            <!-- <view class="bg-img" style="background-image: url('{{ userInfo.head_pic }}')"></view> -->
          </view>
          <view class="ui-info">
            <view class="user-name">{{ userInfo.nickname }}</view>
          </view>
        </view>
        <view class="opt">
        </view>
      </view>
      <!--  用户资产  -->
      <view class="block-row user-assets">
        <!--  购物车  -->
        <view class="ua-item" data-router="{{ navigator.cart }}" bindtap="handleTap">
          <view class="num">0</view>
          <view class="label">购物车</view>
        </view>
        <!--  商品收藏  -->
        <view class="ua-item" data-router="{{ navigator.bookmark }}" bindtap="handleTap">
          <view class="num">0</view>
          <view class="label">商品收藏</view>
        </view>
      </view>
      <view class="linear-shade" style="{{ linearShadeStyle }}"></view>
    </view>
  </view>
  <bottom-nav></bottom-nav>
</template>

<style lang="scss" scoped>
  @use '@/styles/member/member.scss'
</style>