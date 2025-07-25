// 获取用户信息
import { userStore } from '@/stores/user'
import type { UserInfo } from '../types/global'

export const getUserProfile = (callback: (res) => {}) => {
  uni.authorize({
    scope: 'scope.userInfo',
    success(res) {
      console.log(res)
      uni.getUserProfile({
        desc: '用户展示用户头像',
        success(res) {
          console.log(res)
          const store = userStore()
          store.setUserInfo(res.userInfo)
          callback(res.userInfo)
        }
      })
    },
    fail(err) {
      console.log(err)
    }
  })
}