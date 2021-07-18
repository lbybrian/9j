import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 字典表
    dict: {},
    // 日志相关
    log: {},
    // 告警相关
    alarm: {},
    // 规则相关
    rule: {},
    // 审计相关
    audit: {},
    //表单数据缓存
    formDatas:{
          // 时间范围下拉
          timeRangeSign:JSON.parse(localStorage.getItem('timeRangeSign'))?JSON.parse(localStorage.getItem('timeRangeSign')):'',
          // 自定义时间范围
          showTime: [1,2,3],
          startTime: '12',
          endTime: '12',
          // 逻辑与
          queryANDList: [{
            fieldName: '12',
            relationSign: '12',
            targetValue: '12',
            and: [1,2,3]
          }],
          // 逻辑或
          queryORList: [{
            fieldName: '1',
            relationSign: '2',
            targetValue: '2',
            or: [1,2,3]
          }],
          // 分桶
          bucketBO: {
            fieldName: '1',
            bucketName: '2',
            typ: '2',
            type: '1',
            dateType: '1',
            aggregationBOList: [{
              fieldName: '',
              aggName: '',
              aggSign: '',
              arr: [],
            }]
          },
          // 桶外聚合
          aggOutList: [{
            fieldName: '',
            aggName: '',
            aggSign: '',
            arr: [],
          }],
          obj: {},
        }
  },
  mutations: {
    setDict(state,dict){
      state.dict = dict
    }
  },
  actions: {
  },
  getters: {
    getDict: state => state.dict
  },
  modules: {
  },
  
})
