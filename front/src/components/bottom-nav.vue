<template>
  <view class="bottom-nav">
    <template v-for="(item, index) in routes" :key="index">
      <navigator :url="item.url" open-type="redirect" class="nav-item" :class="{ active: item.url === currentPage }">
        <div class="img-wrap">
          <image :src="'' + ( item.url === currentPage ? item.activeImg : item.img )" alt="" class="img" />
        </div>
      </navigator>
    </template>
  </view>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
  const routes = [
    {
      url: '/pages/index/index',
      img: '/static/home.svg',
      activeImg: '/static/home-filled.svg'
    },
    {
      url: '/pages/map/index',
      img: '/static/plus.svg',
      activeImg: '/static/plus-filled.svg'
    },
    {
      url: '/pages/user/index',
      img: '/static/user.svg',
      activeImg: '/static/user-filled.svg'
    }
  ]
  const pages = getCurrentPages()
  const currentPage = '/' + pages[0].route

</script>

<style lang="scss" scoped>
  @use '@/uni.scss';

  .bottom-nav {
    position: fixed;
    display: grid;
    left: 0;
    right: 0;
    bottom: 0;
    height: uni.$bottom-nav-height;
    background-color: #fff;
    grid-template-columns: repeat(3, 1fr);

    .nav-item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;

      .img-wrap {
        position: relative;
        display: flex;
        height: 56px;
        width: 56px;
        border-radius: 50%;
        justify-content: center;
        align-items: center;

        &::after {
          content: '';
          position: absolute;
          display: none;
          left: 8px;
          bottom: -4px;
          height: 27px;
          width: 39px;
          background-color: #F55A51;
          filter: blur(20px);
          z-index: -1;
        }
      }


      .img {
        height: 24px;
        width: 24px;
      }


      &.active {
        .img-wrap {
          background-color: #F55A51;
          
          &::after {
            display: block;
          }
        }
      }
    }
  }
</style>