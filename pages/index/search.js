const app = getApp();

Page({
  data: {
    content: '',         // 搜索框中的内容
    companylist: []      // 搜索到的公司列表
  },

  // 页面加载时触发的函数
  async onLoad(options) {
    // 获取传递过来的参数（例如公司名称）
    const companyName = options.id || ''; 

    // 将传递的公司名称设置为搜索框的初始值
    this.setData({
      content: companyName
    });

    // 如果传递的公司名称不为空，执行自动搜索
    if (companyName) {
      await this.searchCompany(companyName);  // 调用搜索函数
    }
  },

  // 当用户输入时触发，更新搜索框的内容
  oninput(e) {
    this.setData({
      content: e.detail.value  // 更新搜索框内容
    });
  },

  // 当输入框失去焦点时，执行搜索
  async onblur() {
    const companyName = this.data.content;
    if (companyName.trim() === '') {
      return; // 如果输入框为空，不执行搜索
    }

    await this.searchCompany(companyName);  // 调用搜索函数
  },

  // 搜索公司函数
  async searchCompany(companyName) {
    try {
      // 请求查询公司
      const findcompany = await app.request({
        url: 'findcompany/' + encodeURIComponent(companyName),  // 假设接口根据公司名称查询
        method: 'GET'
      });
  
      // 请求成功后更新数据
      const companies = findcompany.data.result || [];
      
      // 提取每个公司名称的第一个字作为简称
      const companiesWithShortNames = companies.map(company => {
        const formattedRegisterDate = company.estiblishTime ? company.estiblishTime.split(' ')[0] : ''; 
        return {
          ...company,
          abbreviation: company.name.charAt(0),  // 假设公司名称在 `name` 字段中
          registerDate: formattedRegisterDate    // 格式化后的注册时间
        };
      });
  
      this.setData({
        companylist: companiesWithShortNames  // 更新公司列表
      });
    } catch (error) {
      console.error('Failed to fetch company list:', error);
    }
  },

  // 清除搜索框内容和搜索结果
  clearSearch() {
    this.setData({
      content: '',           // 清空输入框内容
      companylist: []        // 清空公司列表
    });
  },
  handleButtonClick(event){
    console.log(event)
    wx.navigateTo({
      url: '/pages/detail/index?id=' + event.currentTarget.dataset.name, 
      success: function() {
        console.log('跳转成功');
      },
      fail: function() {
        console.error('跳转失败');
      }
    });
  }
});
