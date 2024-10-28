const app = getApp();

Page({
  data: {
    company: {},
    value: 0
  },

  // 页面加载时触发的函数
  async onLoad(options) {
    // 获取传递过来的参数（例如公司名称）
    const companyName = options.id || ''; 

    // 如果传递的公司名称不为空，执行自动搜索
    if (companyName) {
      await this.searchCompany(companyName);  // 调用搜索函数
    }

    const authenticatelog = await app.request({
      url: 'geticon/authenticatelog',
      method: 'GET'
    }); 

    const selectcard = await app.request({
      url: 'services',
      method: 'GET'
    })
    this.setData({
      authenticatelog: authenticatelog.data.data[0],
      selectcard: selectcard.data
    })
  },

  // 搜索公司函数
  async searchCompany(companyName) {
    try {
      // 请求查询公司
      const company = await app.request({
        url: 'getcompanyinfo/' + encodeURIComponent(companyName),  // 假设接口根据公司名称查询
        method: 'GET'
      });
      company.data.result.abbreviation = company.data.result.name.charAt(0);

      // 创建一个 Date 对象
      const date = new Date(company.data.result.estiblishTime);

      // 获取年份
      const year = date.getFullYear();
      // 获取月份（注意：月份是从0开始的，因此需要加1）
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 用 padStart 确保是两位数
      // 获取日期
      const day = String(date.getDate()).padStart(2, '0'); // 用 padStart 确保是两位数

      company.data.result.registerDate = `${year}-${month}-${day}`;

      const kficon = await app.request({
        url: 'geticon/customericon',
        method: 'GET'
      }); 
      this.setData({
        company: company.data.result,  // 更新公司列表
        kficon: kficon.data.data[0]
      });
    } catch (error) {
      console.error('Failed to fetch company list:', error);
    }
  },
 async submitForm(){
    // 存储数据到本地存储 构造数据
    const data = {
      companyName: this.data.company.name,
      legalPersonName: this.data.company.legalPersonName,
      serviceItems: this.data.selectcard[this.data.value].service_name,
      serviceItemsAmount : this.data.selectcard[this.data.value].price,
      unifiedSocialCreditCode: this.data.company.creditCode,
      description: this.data.selectcard[this.data.value].description,
      userid: wx.getStorageSync('user')
    }
    const result = await app.request({
      url:'company',
      method:'POST',
      data
    })

    if(result.data.code == 200){
      wx.reLaunch({
        url: '/pages/user/index',
        success: function() {
          console.log('跳转成功');
        },
        fail: function(error) {
          console.error('跳转失败',error);
        }
      });
    }else{
      wx.showToast({
        title: '提交失败',
      })
    }


  },
  onChange(e) {
    this.setData({ value: e.detail.value });
  },
}); 
