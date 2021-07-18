// 路由配置

import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/main/index' // 首页
import Login from '@/main/Login' // 登录
import Audit from '@/components/Audit' // 审计
import Log from '@/components/Log' // 日志
import Rule from '@/components/Rule' // 规则
import Alarm from '@/components/Alarm' // 告警
import AlarmResult from '@/components/AlarmResult' // 告警结果
import AuditResult from '@/components/AuditResult' // 审计结果
import CsGangUpList from '@/components/CsGangUpList' // 审计结果


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/csganguplist',
      name: 'CsGangUpList',
      component: CsGangUpList, 
//    meta:{ShowBgImg:true}
    },
    {
      path: '/',
      name: 'Login',
      component: Login, // 登录
//    meta:{ShowBgImg:true}
    },
    { // 审计模块
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/audit',
          name: 'audit',
          component: Audit, // 审计分析
          children:[
          	{
          		path:'auditJs',
          		name:'AuditJs',
          		component: ()=>import ('@/components/AuditJs'), // 审计分析
          	},
          	{
          		path:'cycleAuditList',
          		name:'CycleAuditList',
          		component: ()=>import ('@/components/CycleAuditList'), // 审计分析
          	}
          ]
        },
        {
          path: '/log',
          name: 'Log',
          component: Log // 日志管理
        },
        {
          path: '/rule',
          name: 'Rule',
          component: Rule // 规则管理
        },
        {
          path: '/alarm',
          name: 'Alarm',
          component: Alarm // 告警管理
        },
        {
          path: '/auditResult',
          name: 'AuditResult',
          component: AuditResult // 审计结果
        },
        {
          path: '/alarmResult',
          name: 'AlarmResult',
          component: AlarmResult // 告警结果
        },
      ]
    }
  ]
})
