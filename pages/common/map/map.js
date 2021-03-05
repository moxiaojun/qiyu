const QQMapWX = require('../../../utils/qqmap-wx-jssdk.min.js');
let qqmapsdk ;
const app = getApp();
Page({
  data: {
    Height: 0,
    scale: 13,
    latitude: "",
    longitude: "",
    markers: [],  
    activeAddress:""
  },

  onLoad: function () {
    var _this = this;
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'JVJBZ-MWFWX-XO34N-7ML2W-LNSWQ-IZFDW'
    });

    wx.getSystemInfo({
      success: function (res) {
        //设置map高度，根据当前设备宽高满屏显示
        _this.setData({
          view: {
            Height: res.windowHeight
          }
        })
      }
    })
    this.getAddressInfo();
  },
  
   // 获取地址信息
 getAddressInfo() { 
  var that = this;
  app.checkAuth((res) => { 
    console.log(res)
    var location = {
      latitude: res.latitude,
      longitude: res.longitude
    }; 
    that.setData({
      latitude: res.latitude,
      longitude: res.longitude,
      markers: [{
        id: "1",
        latitude: res.latitude,
        longitude: res.longitude  
      }]
    });
    qqmapsdk.reverseGeocoder({
          location: location,
          get_poi: 1,        // 是否返回周边POI列表：1.返回；0不返回(默认)
          poi_options: "policy=2;radius=5000",
          success: res => {
            var res = res.result;
            console.log(res)
            that.setData({
              activeAddress: res.address,
              addressList: res.pois
            });
          },

          fail: function(error) {
            console.error(error);
          },

          complete: function(res) {
            // console.log(res);
          }
        })
      })
} ,
regionchange(e) {
  console.log("regionchange===" + e.type)
},

  //点击merkers
  markertap(e) {
    console.log(e.markerId) 
    wx.showActionSheet({
      itemList: ["A"],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
 
})