<script setup lang="ts">
  import { reactive, ref, computed } from 'vue';
  import bottomNav from '@/components/bottom-nav'
  import loginBtn from '@/components/login-btn'

  const userInfo = reactive({
    head_pic: '',
    nickname: ''
  })
  const linearShadeStyle = computed(() => {
    let
      str = `background: linear-gradient(180deg, rgba(195, 71, 83, 1) 0%, rgba(195, 71, 83, 1) 80% #ffffff 100%`

    return str
  })
</script>
<template>
  <view class="member-page">
    <!-- 用户头部信息 -->
    <view class="page-block user-header bg-type-color" style="{{ memberHeaderStyle }}">
      <view class="block-row user-info-opt">
        <view class="user-info">
          <view class="ui-avatar" bindtap="handleTap" data-router="/pages/member/completeProfile">
            <image :src="userInfo.head_pic" mode="widthFix" alt="" class="img"></image>
            <!-- <view class="bg-img" style="background-image: url('{{ userInfo.head_pic }}')"></view> -->
          </view>
          <view class="ui-info">
            <view class="user-name">{{ userInfo.nickname || '微信用户' }}</view>
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
    <!-- 排序区块 -->
    <view class="sort-block-list">
      <!-- 完善资料 -->
      <view class="page-block block-entry complete-profile" data-router="/pages/member/completeProfile"
        bindtap="handleTap">
        <view class="l-wrap">
          <view class="icon">
            <image class="img" mode="widthFix" src="/static/user-3-fill.svg" alt=""></image>
          </view>
          <view class="title">完善资料</view>
        </view>
        <view class="r-wrap">
          <image class="arrow" mode="widthFix" src="/static/arrow-right-line.svg" alt=""></image>
        </view>
      </view>
      <!--  其他  -->
      <view class="page-block others" style="">
        <view class="block-entry" bindtap="handleTap" data-router="/pages/member/settings">
          <view class="l-wrap">
            <view class="icon">
              <image src="/static/settings-4-fill.svg" alt="" class="img" mode="widthFix"></image>
            </view>
            <view class="title">设置</view>
          </view>
          <view class="r-wrap">
            <image class="arrow" mode="widthFix" src="/static/arrow-right-line.svg" alt=""></image>
          </view>
        </view>
 <!--       <view>
          
          <login-btn>登录</login-btn>
        </view> -->
      </view>
    </view>
  </view>
  <bottom-nav></bottom-nav>
</template>

<style lang="scss" scoped>
  @use '@/styles/member/member.scss'
</style>