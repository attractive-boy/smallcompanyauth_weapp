const app = getApp();
Page({
  data: {
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    swiperList: [],  // 初始化为一个空数组
    newnoticeicon: '',
    companyicon:'',
    companynumicon1: '',
    companynumicon2: '',
    bah:'',
    autnum:'',
    qyname:'',
    showpop: false
  },

  // 页面加载时触发的函数
  async onLoad() {
    try {
      const swiperList = await app.request({
        url: 'getswiper',
        method: 'GET'
      });
      console.log("swiperList===>",swiperList)
      const newnoticeicon = await app.request({
        url: 'geticon/newnoticeicon',
        method: 'GET'
      }); 
      const notice = await app.request({
        url: 'announcements',
        method: 'GET'
      })
      console.log(newnoticeicon)
      const companyicon = await app.request({
        url: 'geticon/companyicon',
        method: 'GET'
      }); 
      const companynumicon = await app.request({
        url: 'geticon/companynumicon',
        method: 'GET'
      }); 
      const getbah = await app.request({
        url: 'getsettingtext/bah',
        method: 'GET'
      }); 
      const autnum = await app.request({
        url: 'getauthnum',
        method: 'GET'
      }); 
      // 请求成功后更新数据
      this.setData({
        swiperList: swiperList.data.data,
        newnoticeicon: newnoticeicon.data.data[0],
        notice: notice.data,
        companyicon: companyicon.data.data[0],
        companynumicon1:  companynumicon.data.data[0],
        companynumicon2: companynumicon.data.data[1],
        bah:getbah.data.data,
        autnum: autnum.data.data
      });
    } catch (error) {
      console.error('Failed to fetch swiper list:', error);
    }
  },
  goToNoticeList() {
    wx.navigateTo({
      url: '/pages/index/noticeList', 
      success: function() {
        console.log('跳转成功');
      },
      fail: function() {
        console.error('跳转失败');
      }
    });
  },
  goTodetail(event){
    console.log(event)
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: '/pages/index/noticeDetail?id=' + id, 
      success: function() {
        console.log('跳转成功');
      },
      fail: function() {
        console.error('跳转失败');
      }
    });
  },
  changeqyname(event){
    // console.log(event)
    this.setData({
      qyname: event.detail.value
    })
  },
  async search(){
    //判断是否是登录状态
    const userid = wx.getStorageSync('user');
    if(!userid){
      this.setData({
        showpop:true
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/index/search?id=' + this.data.qyname, 
      success: function() {
        console.log('跳转成功');
      },
      fail: function(err) {
        console.error('跳转失败', err);
      }
    });

    
  },
  closepop(){
    this.setData({
      showpop:false
    })
  }
});
