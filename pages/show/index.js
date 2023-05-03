const { store } = getApp();
Page({
  data: {
    formData: {},
    observer: null,
  },
  onLoad() {
    // 注册store监听器, state变化时更新页面数据
    const observer = (newState) => {
      console.log("监听到state changed", newState);
      this.setData({
        formData: newState.formData,
      });
    };
    this.setData({
      observer: store.observe(observer),
    });
  },

  // 页面卸载时注销监听
  onUnload() {
    this.data.observer();
  },

  // 修改每一项数据
  changeHandle(e){
    const { field } = e.target.dataset;
    wx.navigateTo({
      url: '/pages/changeForm/index?field=' + field,
    });
  },

  // 返回重新注册
  buttonHandler() {
    wx.redirectTo({
      url: '/pages/index/index',
    });
  },
});
