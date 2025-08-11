<template>
  <map name="" class="map" :longitude="longitude" :latitude="latitude" :markers="markers" :scale="scale"></map>
  <div class="search-panel">
    <div class="search-input">
      <input type="text" v-model="keyword" />
      <button class="btn" @click="clickSearch">搜索</button>
    </div>
    <scroll-view class="search-list" direction="vertical" :scroll-y="true">
      <div class="list-item" v-for="(item, index) in dataList" :key="item.id" @click="goDetail(item)">
        <img src="@/static/shop.svg" alt="" class="item-thumb"> 
        <div class="item-content">
          <div class="name">{{ item.title }}</div>
          <div class="category">{{ item.category }}</div>
        </div>
      </div>
    </scroll-view>
  </div>
  <bottom-nav></bottom-nav>
</template>

<script setup type="ts">
  import bottomNav from '@/components/bottom-nav'
  import { userStore } from '@/stores/user'
  import { poiStore } from '@/stores/poi'
  import { qqmapsdk, getUserLocation, getSuggestion, search } from '@/composables/map'
  import { ref, computed } from 'vue'
  import _ from 'lodash'
import { log } from 'console'
  
  const store = userStore()
  const poiStoreInst = poiStore()
  const longitude = computed(() => {
    return store.address ? store.address.location.lng : ''
  })
  const latitude = computed(() => {
    return store.address ? store.address.location.lat :''
  })
  const keyword = ref('')
  const markers = ref([])
  const scale = ref(10)
  const dataList = ref([])
  
  if ( !store.address ) {
    getUserLocation()
  }

  const inputHandler = _.debounce(() => {
    
  }, 300)
  
  const clickSearch = () => {
    markers.value = []
    const region = store.address.ad_info.city
    const location = store.address.location.lat + ',' + store.address.location.lng
    search({ keyword: keyword.value, region, location }).then(pois => {
      dataList.value = pois
      pois.forEach((poi, index) => {
        markers.value.push({
          id: index,
          latitude: poi.location.lat,
          longitude: poi.location.lng,
          iconPath: '/static/marker.svg',
          width: 28,
          height: 41,
        })
      })
    })
  }
  
  const goDetail = (poi) => {
    poiStoreInst.setPoi(poi)
    uni.navigateTo({
      url: '/pages/record/detail'
    })
  }
</script>

<style lang="scss" scoped>
  @use '@/uni.scss';

  .map {
    height: 100%;
    width: 100%;
  }

  .search-panel {
    position: fixed;
    left: 23px;
    right: 23px;
    bottom: calc(uni.$bottom-nav-height + 23px);
    padding: 14px 12px;
    border-radius: 12px;
    background-color: #fff;
    overflow: hidden;

    .search-input {
      display: flex;
      height: 35px;

      input,
      .btn {
        height: 35px;
      }

      input {
        flex: 1;
        padding: 0 12px;
        border-radius: 8px;
        background-color: #eee;
      }

      .btn {
        margin: 0 0 0 18px;
        padding: 11px 12px;
        font-size: 12px;
        line-height: 1;
        background-color: #fff;
      }
    }

    .search-list {
      height: 20vh;

      .list-item {
        display: grid;
        padding: 11px;
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
          grid-template-rows: repeat(2, 1fr);
          align-items: center;
          
          .name {
            font-size: 16px;
          }
          
          .category {
            color: #8f939c;
          }
        }
      }
    }
  }
</style>