// 获取用户信息
import { userStore } from '@/stores/user'
import type { UserInfo } from '../types/global'
const store = userStore()
/**
 * 检查登录状态是否过期
 */
export const checkLoginSession = () => {
  return new Promise<void>((resolve, reject) => {
    uni.checkSession({
      success() {
        resolve()
      },
      fail() {
        reject()
      },
      complete() {
        
      }
    })
  })
}

export const codeLogin = () => {
  uni.login({
    success(authResult?, code?, appleInfo?, errMsg) {
      console.log(authResult)
    },
    fail(err) {
      
        console.log(err)
    }
  })
}