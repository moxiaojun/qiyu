// pages/common/camera/camera.js
// import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';
import Toast  from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Height:"",
    show:true,
    src:"",
    uping:false
  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log(res)
        this.setData({
          src: res.tempImagePath,
          show:false
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },
  resetPhoto(){
    this.setData({ 
      show:true
    })
  },
  uploadPhoto(){
    const file = this.data.src;
    if(file){
      this.setData({ 
        uping:true
      }) 
      console.log(file); 
      wx.uploadFile({ url: 'http://127.0.0.1:5888/qiyu/upload',  filePath: file, name: 'file', formData:{ 'user': 'test'},
       success: function(res){        
         var data = res.data    
         console.log(data)  
         wx.navigateBack({
           delta: 0,
         }) 
        } 
      })
    }else{
      Toast('请先拍摄照片');
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({ 
            Height: res.windowHeight
        })
      }
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