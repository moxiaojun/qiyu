// app.js

App({
  onLaunch() {
    const _this = this;
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //发起网络请求
        wx.request({
          url: 'http://127.0.0.1:5888/qiyu/getUser',
          data: {
            code: res.code
          },
          success: function (res) { 
            const self = this
            if (res.data.state=="OK") {
              //获取到用户凭证 存儲 3rd_session 
              var json = res.data.data;//JSON.parse(res.data.data)
              wx.setStorage({
                key: "third_Session", 
                data: json.third_Session
              })
              _this.getUserInfo()
            }
            else {
 
            }
          },
          fail: function (res) {
 
          }
        })
      },
      fail: function (res) {
  
      }  
    })
    
  },
  getUserInfo() {
    // 获取用户信息
    wx.getSetting({
      success: res => { 
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          this.checkAuth(res=>{
            console.log(res)
          })
        }
      }
    }) 
  },
  // 授权获取地址信息
  checkAuth(callback) {
    wx.getLocation({
      type: 'gcj02',
      isHighAccuracy: true,         // 开启高精度
      success(res) {
        callback(res);
      },
      fail: function() {
        wx.showModal({
          title: '是否授权当前位置',
          content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
          success: (res) => {
            console.log(res)
            if (res.confirm) {
              wx.openSetting({
                success: function (data) {
                  console.log(data)
                  if (data.authSetting["scope.userLocation"]) {
                    wx.getLocation({
                      type: 'gcj02',
                      isHighAccuracy: true,         // 开启高精度
                      success(res) {
                        callback(res);
                      }
                    })
                  } else {
                    wx.showToast({
                      title: '授权失败',
                      icon: 'success',
                      duration: 1000
                    })
                  }
                }
              })
            }
          },
        })     
      }
    })
  }, 
  globalData: {
    userInfo: null
  }
})
