import { getQuestionList } from "../../data/questionList";

// pages/result/result.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    score: '加载中...',
    userName: '',
    questionList: [],
    userAnswer: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.getStorage({
      key: "userAnswer",
      success: (result) => {
        this.setData({
          userAnswer: result.data,
        });

        this.getScore(result.data)
      },
      fail: () => {},
      complete: () => {},
    });

    wx.setStorage({
      key: "userAnswer",
      data: null,
    });
    wx.getStorage({
      key: "userName",
      success: (result) => {
        this.setData({
          userName: result.data,
        });
      },
      fail: () => {},
      complete: () => {},
    });

    this.setData({
      questionList: getQuestionList(),
    });


    // this.setData({
    //   userAnswer: [
    //     {
    //       content: "B. var",
    //       isRight: true,
    //     },
    //     {
    //       content: "D. println()",
    //       isRight: false,
    //     },
    //     {
    //       content: "B. ==",
    //       isRight: false,
    //     },
    //     {
    //       content: "C. shift()",
    //       isRight: false,
    //     },
    //     {
    //       content: "C. location.search",
    //       isRight: true,
    //     },
    //     {
    //       content: "B. toString()",
    //       isRight: false,
    //     },
    //     {
    //       content: "C. Boolean",
    //       isRight: false,
    //     },
    //     {
    //       content: "B. onsubmit",
    //       isRight: false,
    //     },
    //     {
    //       content: "C. Object.entries()",
    //       isRight: false,
    //     },
    //     {
    //       content: "C. delete()",
    //       isRight: true,
    //     },
    //   ],
    // });
  },

  backHandler(){
    wx.redirectTo({
      url: '/pages/test/test',
    });
  },

  getScore(userAnswer){
    let score = 0
    userAnswer.forEach(element => {
      if(element.isRight){
        score++
      }
    });

    this.setData({
      score
    })
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
