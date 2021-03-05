// pages/daka/daka.js
import Api from '../../api/api'  
const util = require('../../utils/util.js');
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
let timing = 0;
 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: true,
    curTime: "00:00",
    dakaState: "",
    workTxt: {
      "lateWork": "迟到打卡",
      "onWork": "上工打卡",
      "offWork": "下工打卡"
    },
    distance: [],
    inRange: false,
    project: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let project = JSON.parse(options.project);
    const _this = this;
    console.log(project)
    _this.setData({
      curTime: util.formatTimeHMS(new Date()),
      project: project
    }) 
    //计算距离 
    qqmapsdk = new QQMapWX({
      key: 'JVJBZ-MWFWX-XO34N-7ML2W-LNSWQ-IZFDW'
    });
    qqmapsdk.calculateDistance({
      mode: 'straight',
      from: '', //若起点有数据则采用起点坐标，若为空默认当前地址 
      to: `${project.latitude},${project.longitude}`, //终点坐标 
      success: function (res) { //成功后的回调 
        var res = res.result;
        let hw = res.elements[0].distance //拿到距离(米) 
        var dis = [];
        for (var i = 0; i < res.elements.length; i++) {
          dis.push(hw); //将返回数据存入dis数组， 
        } 
        _this.setData({ //设置并更新distance数据 
          distance: dis,
          inRange: dis - project.range >0 ?  false : true
        }); 
      },
      fail: function (error) {
        console.error(error);
      },
      complete: function (res) {
        console.log(res);
      }
    });
    
     //获取上下班时间戳
     let workTime = _this.data.project.workTime.split('-'); 
     console.log(workTime);
    let onworkTime = util.formatStamp(workTime[0]);  
    let offworkTime = util.formatStamp(workTime[1]);  
    
    //时间
    timing = setInterval(_ => {
        const _curTime = new Date();
        let _dakaState = "";  
        if(onworkTime > Date.parse( util.formatTime(_curTime)) ){
          _dakaState = "onWork"
        } else if(Date.parse( util.formatTime(_curTime)) > offworkTime){
          _dakaState = "offWork"
        }else{
          _dakaState = "lateWork"
        }
        _this.setData({
          curTime: util.formatTimeHMS(_curTime),
          dakaState:_dakaState
        })
    }, 1000); 
    _this.getDaKa();
  },
  getDaKa(){ 
    Api.getDaKaJiLu(res=>{});  
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
    timing = setInterval(_ => {
      this.setData({
        curTime: util.formatTimeHMS(new Date())
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(timing)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timing)
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

  },
  todaka() {
    wx.navigateTo({
      url: '../dakajilu/dakajilu'
    })
  },
  onclick() {
    wx.navigateTo({
      url: '../common/camera/camera',
    })
  }
})