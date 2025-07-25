<template>
  <view class="top-bar">
    <view class="menu">
      <image mode="aspectFill" class="hamburger" src="../static/menu.svg" alt="" />
    </view>
    <view class="address-info">{{ userAddress }}</view>
    <view class="user-avatar">
      <image mode="aspectFill"></image>
    </view>
  </view>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { getUserLocation } from '@/composables/map.ts'
  import type { UserAddress } from '@/types/global.js'
  import { userStore } from '@/stores/user'

  
  const store = userStore()
  const userAddress = ref('')
  getUserLocation().then((res: UserAddress) => {
    userAddress.value = res.address
  })
 
</script>

<style lang="scss" scoped>
  .top-bar {
    display: flex;
    height: 58px;
    padding: 0 25px;
    align-items: center;

    .menu {
      .hamburger {
        height: 24px;
        width: 24px;
      }
    }

    .address-info {
      flex: 1;
      text-align: center;
    }

    .user-avatar {
      width: 42px;
      height: 42px;
      background-color: #ccc;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>