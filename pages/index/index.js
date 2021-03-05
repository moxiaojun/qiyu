// index.js
import Api from '../../api/api'  
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    State:["在建","停工","完成"],
    StateColor:["build","stop","complete"],
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list:[]
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() { 
    if (app.globalData.userInfo) { 
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      this.getProjectList();
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况 
      app.userInfoReadyCallback = res => { 
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        }) 
        this.getProjectList();
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          this.getProjectList();
        }
      })
    }
    this.getProjectList();
  },
  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }, 
  gotoPage(e){
    console.log(e)
    wx.navigateTo({
      url: `/pages/project/project?id=${e.target.id}`,
    })
  } ,
  addressClick(){
    wx.navigateTo({
      url: '/pages/common/map/map',
    }) 
  },
  getProjectList(){
    console.log('ininiininin')
    console.log(app)
    Api.getProjectList().then(res=>{
      this.setData({
        list:res.data.list
      })
    })
  }
})
