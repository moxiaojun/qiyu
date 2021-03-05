// pages/workovertime/workovertime.js
import Api from '../../api/api'  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adopt:20,
    refuse:20,
    list:[],
    state:{
      adopt:"通过",
      examine:"审核中",
      refuse:"拒绝",
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    Api.getWorkOvertime(options).then(res=>{
      console.log(res)
      this.setData({
        adopt:res.data.adopt,
        refuse:res.data.refuse,
        list:res.data.list
      })
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