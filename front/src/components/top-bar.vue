<template>
  <view class="top-bar">
    <view class="user-info">
      <view class="address-info">
        <img class="map-pin" src="@/static/map-pin.svg" alt="" />
        <text class="text">{{ userAddress }}</text>
      </view>
      <view class="favorite">
        <img class="heart" src="@/static/heart.svg" alt="" />
      </view>
    </view>
    <view class="greeting">
      <view class="content">用户，您好</view>
      <view class="title">通过下方快速搜索、定位到喜爱的美食吧！</view>
    </view>
    <view class="search-input-wrap">
      <img class="search-img" src="@/static/search.svg" alt="" />
      <uni-easyinput v-model="query.keyword" class="searchinput" placeholder="早餐、汉堡、披萨、咖啡、奶茶..." :input-border="false"></uni-easyinput>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'
  import { getUserLocation } from '@/composables/map.ts'
  import type { UserAddress } from '@/types/global.js'
  import { userStore } from '@/stores/user'

  
  const store = userStore()
  const userAddress = ref('')
  getUserLocation().then((res: UserAddress) => {
    userAddress.value = res.address
  })
  const query = reactive({ keyword: '' })
 
</script>

<style lang="scss" scoped>
  @use '@/styles/colors.scss';
  .top-bar {
    padding: 16px 0;
    background: 0 0/cover url('@/static/Background.svg');


    .user-info {
      display: flex;
      padding: 8px 16px;
      gap: 12px;
      align-items: center;
      
      .address-info {
        flex: 1;
        display: flex;
        border-radius: 20px;
        padding: 12px 10px;
        background: rgba(255, 255, 255, 0.4);
        align-items: center;
        gap: 6px;
        
        .map-pin {
          width: 16px;
          height: 16px;
        }
        
        .text {
          color: colors.$Gray-90;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          letter-spacing: 0px;
          text-align: left;
        }
      }
      
      .favorite {
        padding: 4px;
        border-radius: 20px;
        background-color: rgba(255, 255, 255, 1);
        font-size: 0;
        
        .heart {
          width: 24px;
          height: 24px;
        }
      }
    }
    
    .greeting {
      padding: 8px 20px;
      color: #fff;
      
      .content {
        font-size: 16px;
        font-weight: 400;
        line-height: 16px;
      }
      
      .title {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }
    }
    
    .search-input-wrap {
      display: flex;
      padding: 5px 16px;
      margin: 0 20px;
      box-sizing: border-box;
      border: 1px solid colors.$Gray-30;
      border-radius: 12px;
      background: rgba(255, 255, 255, 1);
      align-items: center;
      
      .search-img {
        width: 20px;
        height: 20px;
      }
      
      .search-input {
        color: colors.$Gray-80;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        letter-spacing: 0px;
        text-align: left;
      }
    }
  }
</style>