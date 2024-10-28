const app = getApp();
Page({
  data: {
    requestList: [],
    islogin: false,
    userid: 0,
    serviceVisible: false,
    serviceValue: "",
    services: [],
    selectIdx: '',
    selectcard:[]
  },

  // 页面加载时触发的函数
  async onLoad() {
    const userid = wx.getStorageSync('user');
    console.log(userid != 0)
    if (userid != 0) {
      this.setData({
        userid,
        islogin: true
      })
    }
    try {
      const requestList = await app.request({
        url: 'company/' + userid,
        method: 'GET'
      });
      if (requestList.data.length == 0) {
        requestList.data.push({});
      }
      const selectcard = await app.request({
        url: 'services',
        method: 'GET'
      })
      const services = selectcard.data.map(element => {
        return {
          label: element.service_name,
          value: element.service_name
        }
      });
      // 请求成功后更新数据
      this.setData({
        requestList: requestList.data,
        services,
        selectcard: selectcard.data
      });
    } catch (error) {
      console.error('Failed to fetch swiper list:', error);
    }
  },
  logout() {
    wx.clearStorage();
    wx.reLaunch({
      url: '/pages/user/index'
    });
  },

  onServicePicker(event) {
    console.log(event)
    this.setData({
      serviceValue: event.currentTarget.dataset.name,
      serviceVisible: true,
      selectIdx: event.currentTarget.dataset.id
    });
  },
  onPickerChange(event) {
    console.log(event) 
    const requestList = this.data.requestList;
    requestList[this.data.selectIdx].ServiceItems = event.detail.label[0];
    requestList[this.data.selectIdx].ServiceItemsAmount = this.data.selectcard.find(e => e.service_name == event.detail.label[0]).price;
    this.setData({
      requestList 
    }) 
    this.save(requestList[this.data.selectIdx].ID,"ServiceItems",event.detail.label[0])
    this.save(requestList[this.data.selectIdx].ID,"ServiceItemsAmount",requestList[this.data.selectIdx].ServiceItemsAmount)
  },
  onColumnChange(event) {
    console.log("onColumnChange==>",event)
  },
  save(id, key, value){
    app.request({
      url: 'company/' + id,
      method: 'PUT',
      data:{
        [key]: value
      }
    })
  },
  idcardblur(event){
    console.log(event)
    const requestList = this.data.requestList;
    requestList[event.currentTarget.dataset.index].IDCardNumber = event.detail.value;
    this.setData({
      requestList 
    }) 
    this.save(event.currentTarget.dataset.id,"IDCardNumber",event.detail.value)
  },
  revenueblur(event){
    console.log(event)
    const requestList = this.data.requestList;
    requestList[event.currentTarget.dataset.index].Revenue = event.detail.value;
    this.setData({
      requestList 
    }) 
    this.save(event.currentTarget.dataset.id,"Revenue",event.detail.value)
  },
  async payorlogin(event){
    const id = event.currentTarget.dataset.id
    const userid = wx.getStorageSync('user');
    if(!userid){
      this.setData({
        showpop:true
      })
      return;
    }
    const payrequest = await app.request({
      url:"pay/"+id,
      method:"GET"
    })
    wx.requestPayment({
      ...payrequest.data.data
    })
  },
  closepop(){
    this.setData({
      showpop:false
    })
    wx.reLaunch({
      url: '/pages/user/index',
    })
  }
});