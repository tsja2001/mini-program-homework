import { getQuestionList } from "../../data/questionList";

// pages/test/test.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 题目列表
    questionList: [],
    // 记录当前题目的索引
    currentIndex: 0,
    // 记录用户选择的答案
    userAnswer: [],
    // 当前选择题目的索引
    currentChangedIndex: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      questionList: getQuestionList(),
    });
  },

  // 点击题目选项的事件处理函数
  tapHandler(e) {
    const { value } = e.currentTarget.dataset;

    const { currentIndex, userAnswer } = this.data;

    userAnswer[currentIndex] = value;

    this.setData({
      userAnswer,
    });
  },

  // 点击下一题的事件处理函数
  nextHandler(){
    // 到最后一题
    if(this.data.currentIndex === this.data.questionList.length - 1){
      wx.redirectTo({
        url: '/pages/result/result',
      });

      wx.setStorage({
        key: 'userAnswer',
        data: this.data.userAnswer,
      });
    }
    this.setData({
      currentIndex: this.data.currentIndex + 1,
    });
  },
  // 
  prevHandler(){
    this.setData({
      currentIndex: this.data.currentIndex - 1,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
});
