// pages/workPoints/workPoints.js
import Api from '../../api/api'  
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project:{},
    workList :[],
    overWorkList :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let project = JSON.parse(options.project);
    console.log(app.globalData)
    Api.getIntegral(project).then(res=>{
      this.setData({ 
        project: project,
        workList:res.data.workList,
        overWorkList:res.data.overWorkList
      }) 
    })
    wx.setNavigationBarTitle({
      title: '工天报表',
    }) 
  },
  gotoWorkovertime(){
    wx.navigateTo({
      url: `/pages/workovertime/workovertime?projectId=${this.data.project.id}`,
    }) 
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})