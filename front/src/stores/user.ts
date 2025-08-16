import { defineStore } from 'pinia';
import type { UserAddress, UserInfo } from '../types/global'
// 用户 store
export const useUserStore = defineStore('userStore', {
  state: () => { 
    return { 
      address: null, 
      userInfo: { nickName: '', avatar: '' },
      accessToken: '',
      refreshToken: ''
    }
  },
  getters: {
  },
  actions: {
    setAddress (address: UserAddress) {
      this.address = address
    },
    setUserInfo (info: UserInfo) {
      this.userInfo = info
    },
    setAccessToken (token: String) {
      this.accessToken = token
    },
    setRefreshToken (token: String) {
      this.refreshToken = token
    }
  },
})