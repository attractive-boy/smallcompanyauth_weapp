const app = getApp();
Page({
  data: {
    content:'' 
  }, 

  // 页面加载时触发的函数
  async onLoad() {

    try {
      const content = await app.request({
        url: 'getsettingtext/userAgreement',
        method: 'GET'
      });
     
 
      // 请求成功后更新数据
      this.setData({
        content: content.data.data,
      });
    } catch (error) {
      console.error( error);
    }
  }
});
