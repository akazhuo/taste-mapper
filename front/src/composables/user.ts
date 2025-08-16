// 获取用户信息
import type { UserInfo } from '../types/global'
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
  return new Promise<void>((resolve, reject) => {
    uni.login({
      success(authResult?, code?, appleInfo?, errMsg) {
        uni.request({
          url: 'http://localhost:3000/user/codeLogin',
          data: { code: authResult.code },
          method: 'POST',
          success (res) {
            const { result } = res.data
            uni.setStorageSync('userInfo', result.user)
            uni.setStorageSync('accessToken', result.accessToken)
            uni.setStorageSync('refreshToken', result.refreshToken)
            resolve(result)
          },
          fail(err) {
            console.log(err)
            reject(err)
          }
        })
      },
      fail(err) {
        
          console.log(err)
      }
    })
  })

}