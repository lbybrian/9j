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
