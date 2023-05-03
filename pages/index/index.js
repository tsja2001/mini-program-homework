Page({
  data: {
    formData: {
      date: "",
      sex: "2",
      name: "",
      phonenum: "",
      school: "",
      xueyuan: "",
      zhuanye: "",
      imgUrl: [],
    },
  },
  onLoad() {
    // 初始化日期数据
    this.setData({
      formData: {
        ...this.data.formData,
        date: this.getDate(),
      },
    });
  },
  // 获取当前日期, 用于初始化日期选择器
  getDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthFormat = month < 10 ? `0${month}` : month;
    const day = date.getDate();
    const dayFormat = day < 10 ? `0${day}` : day;
    return `${year}-${monthFormat}-${dayFormat}`;
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
  
  // 验证并提交表单
  submitForm() {
    const { formData } = this.data;
    const values = Object.values(formData)
    if (values.some((item) => !item)) {
      wx.showToast({
        title: "请填写完整信息",
        icon: "none",
      });
      return;
    }

    // 记录表单数据, 跳转到数据显示页面
    const { store } = getApp();
    store.set("formData", formData);

    console.log(JSON.stringify(formData));
    wx.navigateTo({
      url: "/pages/show/index",
    })
  },
});
