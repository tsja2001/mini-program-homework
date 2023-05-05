// index.js
Page({
  data: {
    latitude: null,
    longitude: null,
    destination: {
      latitude: null,
      longitude: null,
      name: ''
    },
    distance: null
  },

  onLoad: function () {
    this.getUserLocation();
  },

  getUserLocation: function () {
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
    });
  },

  chooseLocation: function () {
    const that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          destination: {
            latitude: res.latitude,
            longitude: res.longitude,
            name: res.name
          }
        });
      }
    });
  },

  calculateDistance: function () {
    const R = 6371000; // 地球半径，单位：米
    const rad = function (d) {
      return d * Math.PI / 180.0;
    };
    
    const radLat1 = rad(this.data.latitude);
    const radLat2 = rad(this.data.destination.latitude);
    const a = radLat1 - radLat2;
    const b = rad(this.data.longitude) - rad(this.data.destination.longitude);
    
    let distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    distance = distance * R;
    distance = Math.round(distance * 100) / 100; // 保留两位小数

    this.setData({
      distance: distance
    });
  }
});
