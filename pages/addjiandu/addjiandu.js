// pages/addjiandu/addjiandu.js
 
import Api from '../../api/api' //首先要引入封装好的上述api文件，路径根据自己文件的位置
Page({

  /**
   * 页面的初始数据
   */
  data: { 
    name:"",
    date:"",
    info:"",
    dec:"",
    img:[],
    rate:"",
    show: false,
  },
  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date); 
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  },
  onConfirm(event) { 
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
  afterRead(event) {
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { user: 'test' },
      success(res) {
        // 上传完成需要更新 fileList
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ img:fileList });
      },
    });
  },
  onChangeRate(event){ 
    this.setData({ rate:event.detail });
    let that = this.data;
    console.log(that) 
  },
  submit(){
    let that = this.data; 
    Api._addJianDu(that).then(res=>{
      wx.navigateBack({
        delta: 0,
      }) 
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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