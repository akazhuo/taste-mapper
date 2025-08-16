<template>
  <view class="page">
    <banner></banner>
    <category></category>
    <discount></discount>
    <picks></picks>
    <best-selling></best-selling>
    <div class="data-panel">
      <div class="panel-title">最近添加</div>
      <div class="panel-content  recent-list">
        <uni-swipe-action-item v-for="item in dataList" :key="item._id" :right-options="swipeAcionOptions"
          @click="onClickSwipeAction(item._id)">
          <div class="list-item">
            <image :src="item.pics.length > 0 ? (IMG_PATH + item.pics[0]) : ''" alt="" class="item-thumb"
              mode="aspectFit" />
            <div class="item-content">
              <div class="name">{{ item.title }}</div>
              <div class="shop">{{ item.shop }}</div>
            </div>
          </div>
        </uni-swipe-action-item>
      </div>
    </div>
    <bottom-nav></bottom-nav>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Banner from './components/banner.vue'
  import Category from './components/category.vue'
  import Discount from './components/discount.vue'
  import Picks from './components/picks.vue'
  import BestSelling from './components/best-selling.vue'
  import BottomNav from '@/components/bottom-nav.vue'
  import { onShow } from '@dcloudio/uni-app'
  import { imgUrl } from '@/composables/utils'

  const dataList = ref([])
  const IMG_PATH = imgUrl + '/uploads/'
  const swipeAcionOptions = [{
    text: '删除',
    style: {
      backgroundColor: '#e43d33'
    }
  }]

  const delItem = (id : string) => {
    uni.request({
      url: 'http://localhost:3000/taste/del',
      data: { id },
      method: 'DELETE',
      success(res) {
        if (res.data.code === 200) {
          getList()
        }
      }
    })
  }

  const getList = () => {
    uni.request({
      url: 'http://localhost:3000/taste',
      method: 'GET',
      data: {
      },
      success(res) {
        dataList.value = res.data
      },
      fail(err) {
        console.log(err)
      }
    })
  }

  const onClickSwipeAction = (id) => {
    delItem(id)
  }

  onShow(() => {
    getList()
  })
</script>

<style lang="scss">
  @use '@/styles/colors.scss';

  .index-component {
    margin-top: 24px;
    padding: 0 20px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        flex: 1;
        color: colors.$Ambient-80;
        font-size: 20px;
        font-weight: 400;
        line-height: 28px;
      }

      .browser {
        display: flex;
        color: colors.$Primary-125;
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        align-items: center;

        .chevron-right {
          width: 16px;
          height: 16px;
        }
      }
    }

    .body {
      margin-top: 16px;
    }
  }
</style>

<style lang="scss" scoped>
  .data-panel {
    margin: 0 14px;

    .panel-title {
      margin: 25px 0 0 12px;
      font-size: 20px;
    }
  }

  .panel-content {
    margin-top: 32px;
    background-color: #fff;
  }

  .list-item {
    display: grid;
    padding: 11px 0;
    margin: 0 14px;
    grid-template-columns: 80px auto auto;
    font-size: 14px;

    .item-thumb {
      height: 80px;
      width: 80px;
      border-radius: 8px;
      background-color: #eee;
      overflow: hidden;
    }

    .item-content {
      display: grid;
      margin: 0 15px;
      align-items: center;
      grid-template-rows: repeat(2, 1fr);

      .name {
        font-size: 16px;
      }

      .shop {
        color: #8f939c;
      }
    }

    .star-img {
      width: 14px;
    }

    .rate {
      margin-left: 4px;
    }
  }
</style>