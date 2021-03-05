// pages/workReportList/workReportList.js
import Api from '../../api/api' //首先要引入封装好的上述api文件，路径根据自己文件的位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total:0,
    list:[],
    project:{},
    projectStr:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let project = options.project ? JSON.parse(options.project) :''; 
    Api.getWorkReportList().then(res=>{
      this.setData({
        total:res.data.total,
        list:res.data.list,
        project:project,
        projectStr:options.project
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