Page({
  data: {
    field: "",
    newData: null,
    formData: {},
  },
  onLoad(data) {
    const { field } = data;
    this.setData({
      field,
    });

    // 获取完整表单数据
    const { store } = getApp();
    const formData = store.get("formData");
    this.setData({
      formData,
    });
  },
  // 表单项修改回掉
  formHandler(e) {
    const field = e.target.dataset.field;
    const value = e.detail.value;
    this.setData({
      formData: {
        ...this.data.formData,
        [field]: value,
      },
    });
  },

  // 图片选择回掉
  imgSelectHandler(e) {
    const buffer = e.detail.contents[0];
    console.log(buffer);
    const imgUrl = this.arrayBufferToBase64(buffer);
    this.setData({
      formData: {
        ...this.data.formData,
        imgUrl: [
          {
            url: imgUrl,
          },
        ],
      },
    });
  },

  arrayBufferToBase64: function (buffer) {
    let base64 = wx.arrayBufferToBase64(buffer);
    return "data:image/jpeg;base64," + base64;
  },

  // 图片删除
  imgDeleteHandler: function (e) {
    this.setData({
      formData: {
        ...this.data.formData,
        imgUrl: [],
      },
    });
  },

  arrayBufferToBase64: function (buffer) {
    let base64 = wx.arrayBufferToBase64(buffer);
    return "data:image/jpeg;base64," + base64;
  },

  // 图片删除
  imgDeleteHandler: function (e) {
    this.setData({
      newData: null,
    });
  },

  // 提交修改
  submitForm() {
    const { formData } = this.data;
    const { store } = getApp();
    store.set("formData", formData);
    wx.navigateBack({
      delta: 1,
    });
  },
});
