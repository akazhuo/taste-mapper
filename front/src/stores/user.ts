import { defineStore } from 'pinia';
import type { UserAddress, UserInfo } from '../types/global'
// 用户 store
export const userStore = defineStore('userStore', {
  state: () => { 
    return { address: null, userInfo: null }
  },
  getters: {
  },
  actions: {
    setAddress (address: UserAddress) {
      this.address = address
    },
    setUserInfo (info: UserInfo) {
      this.userInfo = info
    }
  },
})