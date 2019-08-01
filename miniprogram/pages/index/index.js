// miniprogram/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columns: ['江西财经大学', '南昌大学', '华东交通大学', '江西师范大学', '九江学院'],
    flag:false
  },
  enterMain(){
    // wx.switchTab({
    //   url: '../main/main'
    // })
    this.setData({
      flag:true
    })
  },
  onClose(){
    this.setData({
      flag: false
    })
  },
//   getuser(e){
// console.log(e);
//   },
onConfirm(e){
  console.log(e)
    var school = e.detail.value
      console.log(school)
      wx.setStorage({
        key: 'school',
        data: school
        

      })
      this.setData({
        flag: false
      })
      wx.switchTab({
          url: '../main/main'
        })
    
  

},
  onCancel(){
    this.setData({
      flag: false
    }) 
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
    wx.getStorage({
      key: 'school',
      success: function(res) {
        console.log(res.data.school)
        wx.switchTab({
          url: '../main/main'
        })
        // if(res.data){
        //     wx.getUserInfo({
        //   success: function(res){
        //    console.log(res)
        //   }
        //  })
        // }
      },
      // fail: function(){
      //   wx.getUserInfo({
      //     success: function(res){

      //     },
      //     fail: function(){

      //     }
      //   })
      // }
    })
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