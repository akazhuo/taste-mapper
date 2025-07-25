// const amapFile = require('./libs/amap-wx.js')
import { resolve } from 'dns';
import QQMapWX from '../libs/qqmap-wx-jssdk.min.js';
import type { UserAddress } from '../types/global'
import { userStore } from '@/stores/user'

// 实例腾讯地图应用
export const qqmapsdk = new QQMapWX({
  key: ''
});

interface Response {
  message: string;
  request_id: string;
  result: UserAddress;
  status: number;
}
// 获取用户位置
export const getUserLocation = () => {
  return new Promise(resolve => {
    const store = userStore()
    // 已有缓存地址，直接返回
    console.log(store.address)
    if ( store.address ) {
      return resolve(store.address)
    }
    uni.authorize({
      scope: 'scope.userLocation',
      success() {
        uni.getLocation({
          type: 'gcj02',
          success(res) {
            qqmapsdk.reverseGeocoder({
              location: {
                latitude: res.latitude,
                longitude: res.longitude,
              },
              success(res: Response) {
                store.setAddress(res.result)
                uni.setStorage({
                  key: 'userAddress',
                  data: res.result
                })
                resolve(res.result)
              }
            })
          },
          fail(err) {
            console.log(err)
          }
        })
      },
      fail(err) {
        console.log(err)
      }
    })
  }) 
} 
/**
 * 搜索关键词
 */
export const search = (options = { keyword: '', city: '', location: '' }) => {
  return new Promise(resolve => {
    if ( options.keyword.length === 0 ) {
      resolve('')
    }
    qqmapsdk.search({
      keyword: options.keyword,
      location: options.location,
      success(res: Response) {
        console.log(res)
        resolve(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })
  })
}
/**
 * 获取建议
 */
export const getSuggestion = (options = { keyword: '', city: '', location: '' }) => {
  return new Promise(resolve => {
    if ( options.keyword.length === 0 ) {
      resolve('')
    }
    console.log(options)
    qqmapsdk.getSuggestion({
      keyword: options.keyword,
      region: options.city,
      location: options.location,
      success(res: Response) {
        console.log(res)
        resolve(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  })
}