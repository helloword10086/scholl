// component/tiezi/tiezi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    userUrl:{
      type:String,
      value:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557900026915&di=db982b81b3325e59d1e692569c4dd4e3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201712%2F07%2F20171207153423_HCyWf.jpeg'
    },
    name:{
     
        type:String,
        value:'娜扎'
      },
      content:{
          type:String,
          value:'flighting'
      },
      url:{
        type:Array,
        value:[
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557944709521&di=dced61b8d81b51a6e2e00e33edb2c580&imgtype=0&src=http%3A%2F%2Fwenhua.cjn.cn%2Fwhxw%2F201804%2FW020180424355855451999.jpg',
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557944709521&di=dced61b8d81b51a6e2e00e33edb2c580&imgtype=0&src=http%3A%2F%2Fwenhua.cjn.cn%2Fwhxw%2F201804%2FW020180424355855451999.jpg'
        ]
      },
    comment:{
      type:String,
      value:'拍出你的美'
    },
    hotNum:{
      type:Number,
      value:0
    },
    agreeNum:{
      type:Number,
      value:0
    },
    di:{
      type:String,
      value:''
    }
      
  },

  /**
   * 组件的初始数据
   */
  data: {
      flag:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  userAgree(){
     var flag= !this.data.flag
    this.setData({
       flag,
    })
      let agreeNum =this.data.agreeNum
    console.log(agreeNum)
      if(flag){
        agreeNum++;
        this.setData({
          agreeNum,
        })
      }else{
        agreeNum--;{
          this.setData({
            agreeNum,
          })
        }
      }
  },
    userComment(e){
      console.log(e)
      var id = e.target.dataset.di
      wx.navigateTo({
        url: '../../pages/ping/ping?id=' +id,
      })
    },
    previewImage: function (e) {
       console.log(e)
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: this.data.url // 需要预览的图片http链接列表
      })
    } 

  },
  onReady(){

  }
})
