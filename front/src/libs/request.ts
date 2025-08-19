
interface RequestOptions {
  url: string;
  params?: Object;
  data?: Object;
}

class MyRequest {
  constructor(args?: Object) {   
  }
  private static handleErrors (code, errMsg: string): void {
    uni.showToast({
      icon:"fail",
      title: '请求失败,' + errMsg,
    })
  }
  public get (args: RequestOptions): Promise<PromiseFulfilledResult<any> | PromiseRejectedResult> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: args.url,
        method: 'GET',
        header: {
          authorization: uni.getStorageSync('accessToken')
        },
        data: args.params,
        success (res) {
          const data = res.data
          if ( data.code !== 200 ) {
            MyRequest.handleErrors(data.code, data.error)
            reject(data)
          } else {
            resolve(data)
          }
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  public post (args: RequestOptions): Promise<PromiseFulfilledResult<any> | PromiseRejectedResult> {
    return new Promise((resolve, reject) => {
      uni.request({
        url: args.url,
        method: 'POST',
        header: {
          authorization: uni.getStorageSync('accessToken')
        },
        data: args.data,
        success(res) {
          const data = res.data
          if ( data.code !== 200 ) {
            MyRequest.handleErrors(data.code, data.error)
            reject(data)
          } else {
            resolve(data)
          }
        },
        fail(err) {
          reject(err.code, err.error)
        }
      })
    })
  }
}

export default new MyRequest()