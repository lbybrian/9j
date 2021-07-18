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
		ruleForms: {},
		formDatas: {
			// 时间范围下拉
			timeRangeSign: JSON.parse(localStorage.getItem('timeRangeSign')) ? JSON.parse(localStorage.getItem('timeRangeSign')) : '',
			// 自定义时间范围
			showTime: ["2020-08-27 03:12:45", "2021-08-27 11:22:33"],
			startTime: '12',
			endTime: '12',
			// 逻辑与
			queryANDList: [{
				fieldName: '12',
				relationSign: '12',
				targetValue: '12',
				and: [1, 2, 3]
			}],
			// 逻辑或
			queryORList: [{
				fieldName: '1',
				relationSign: '2',
				targetValue: '2',
				or: [1, 2, 3]
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
					arr: [{
						fieldName: '',
						aggName: '',
						aggSign: '',
					}],
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
		},
		jk5: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":   "success"
		},
		jk13: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"id":  21,
				        "analyzeRuleId":  49,
				        "abnormalAlarmRuleDetailId":  13,
				        "name":   "用户登录异常告警-十分钟登录次数超过20次1",
				        "resultFiledName":   "bucketnei_id_count",
				        "alarmRank":  3,
				        "status":   "0",
				        "alarmTime":   "2020-08-28 16:01:24",
				        "alarmCont":   "统计值：32大于设定值：20,触发告警",
				        "targetValue":   "20",
				        "resultValue":   "32"    
			}
		},
		jk12: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"pageNum":  1,
				        "pageSize":  20,
				        "totalPage":  1,
				        "total":  4,
				        "list":  [            {                
						"id":  67,
						                "analyzeRuleId":  49,
						                "abnormalAlarmRuleDetailId":  13,
						                "name":   "用户登录异常规则配置-十分钟登录次数超过20次",
						                "resultFiledName":   "bucketnei_id_count",
						                "alarmRank":  3,
						                "status":   "1",
						                "alarmTime":   "2020-09-14 08:23:59",
						                "alarmCont":   "统计值：44大于设定值：20,触发告警",
						                "ruleName":   "用户登录异常告警规则配置"            
					},              {                
						"id":  65,
						                "analyzeRuleId":  49,
						                "abnormalAlarmRuleDetailId":  13,
						                "name":   "用户登录异常告警规则配置-十分钟登录次数超过20次",
						                "resultFiledName":   "bucketnei_id_count",
						                "alarmRank":  3,
						                "status":   "1",
						                "alarmTime":   "2020-09-04 12:57:59",
						                "alarmCont":   "统计值：44大于设定值：20,触发告警",
						                "ruleName":   "用户登录异常告警规则配置"            
					},
					{
						"id": 35,
						"name": '可删1'
					},
					{
						"id": 35,
						"name": '可删2'
					},
					{
						"id": 35,
						"name": '可删4'
					},
					{
						"id": 35,
						"name": '可删3'
					},
					{
						"id": 35,
						"name": '可删6'
					},
					{
						"id": 35,
						"name": '可删5'
					},         
				]    
			}
		},
		jk3: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  [{        
					"id":  41,
					        "name":   "41用户登录异常告警规则配置",
					        "type":   "1",
					        "cycleSign":   "1",
					        "ruleDesc":   "41用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneYear",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "41十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "41十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [
								{
									analyRuleId:'11',
									chartTemplateId:'21',
									chartType:'1',
									chartName:'欧文',
									xAxis:'11oiedndd',
									yAxisArr:'11yslkndc_ondn'
								},
								{
									analyRuleId:'12',
									chartTemplateId:'21',
									chartType:'2',
									chartName:'欧文222',
									xAxis:'22oiedndd',
									yAxisArr:'22yslkndc_ondn,22id_ondn,22log_ondn'
								},
								{
									analyRuleId:'13',
									chartTemplateId:'21',
									chartType:'3',
									chartName:'欧文333',
									xAxis:'33oiedndd',
									yAxisArr:'33yslkndc_ondn,33Tdandc_zq,33finodc_po'
								},
					],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "1",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  42,
					        "name":   "42用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "42用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneDay",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "42十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  43,
					        "name":   "43用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "43用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneHour",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "43十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "43十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "43十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				},
				{        
					"id":  44,
					        "name":   "44用户登录异常告警规则配置",
					        "type":   "2",
					        "cycleSign":   "1",
					        "ruleDesc":   "44用户登录异常告警规则配置",
					        "queryRuleJson":  {            
						"queryANDList":  [                {                    
							"fieldName":   "systemSign",
							                    "relationSign":   "eq",
							                    "targetValue":  1,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "operationType",
							                    "relationSign":   "eq",
							                    "targetValue":  4,
							                    "maxValue":  null,
							                    "minValue":  null                
						},                  {                    
							"fieldName":   "logType",
							                    "relationSign":   "eq",
							                    "targetValue":  2,
							                    "maxValue":  null,
							                    "minValue":  null                
						}            ],
						            "queryORList":  null,
						            "aggOutList":  [                {                    
							"fieldName":   "_id",
							                    "aggName":   "user_sum",
							                    "aggSign":   "count"                
						}            ],
						            "timeRangeSign":   "oneYear",
						            "bucketBO":  {                
							"fieldName":   "operationUserId",
							                "bucketName":   "user_id_bucket",
							                "type":   "normal",
							                "dateType":  null,
							                "format":  null,
							                "aggregationBOList":  [                    {                        
								"fieldName":   "_id",
								                        "aggName":   "bucketnei_id_count",
								                        "aggSign":   "count"                    
							}                ],
							                "bucketBO":  null            
						},
						            "resultList":  null,
						            "sort":  null,
						            "direction":  null,
						            "page":  null,
						            "size":  null,
						            "sizeLimit":  null        
					},
					        "aardList":  [            {                
						"id":  13,
						                "analyzeRuleId":  49,
						                "ruleName":   "44十分钟登录次数超过5次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  1,
						                "targetStrValue":  null,
						                "targetNumValue":  5,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  14,
						                "analyzeRuleId":  49,
						                "ruleName":   "44十分钟登录次数超过10次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  2,
						                "targetStrValue":  null,
						                "targetNumValue":  10,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					},              {                
						"id":  15,
						                "analyzeRuleId":  49,
						                "ruleName":   "44十分钟登录次数超过20次",
						                "ruleDesc":  null,
						                "bucketName":   "user_id_bucket",
						                "resultFiledName":   "bucketnei_id_count",
						                "aggregationSign":   "1",
						                "relationSign":   "gt",
						                "alarmRank":  3,
						                "targetStrValue":  null,
						                "targetNumValue":  20,
						                "maxValue":  null,
						                "minValue":  null,
						                "status":   "1"            
					}        ],
					        "cycleStatTastDetailDTO":  {            
						"id":  38,
						            "cycleUnit":   "hour",
						            "cycleNum":  2,
						            "numLimit":  0,
						            "executeNum":  55,
						            "versionNum":  88,
						            "executeTime":   "2020-09-02 18:57:59",
						            "startTime":   "2020-08-27 00:00:00",
						            "endTime":   "2021-08-27 00:00:00",
						            "createTime":   "2020-08-27 17:27:58",
						            "status":   "1"        
					},
					        "arctList":  [],
					        "status":   "1"    
				}

			],
		},
		jk7: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  1
		},
		jk18: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"result":   "fail",
				        "currentData":  {            
					"id":   "drjjVnQBCUEUMczdTsmL",
					            "systemSign":  1,
					            "softwareSign":  1,
					            "logType":  3,
					            "moduleSign":  12,
					            "operationType":  4,
					            "operationDesc":   "gjx用户登录",
					            "operationUserId":   "dgywahdio82139wqeq712831",
					            "operationTime":   "2020-09-04 08:12:45",
					            "logCont":   "北京市河北的！！！"        
				}    
			}
		},
		jk11: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"result":   "fail",
				        "bcData":  {            
					"id":   "drjjVnQBCUEUMczdTsmL",
					            "systemSign":  1,
					            "softwareSign":  1,
					            "logType":  3,
					            "moduleSign":  12,
					            "operationType":  4,
					            "operationDesc":   "gjx用户登录",
					            "operationUserId":   "dgywahdio82139wqeq712831",
					            "operationTime":   "2020-09-04 08:12:45",
					            "logCont":   "北京是中国的3333333333",
					            "requestIp":   "0:0:0:0:0:0:0:1",
					            "collectTime":   "2020-09-04 10:12:51"        
				},
				        "currentData":  {            
					"id":   "drjjVnQBCUEUMczdTsmL",
					            "systemSign":  1,
					            "softwareSign":  1,
					            "logType":  3,
					            "moduleSign":  12,
					            "operationType":  4,
					            "operationDesc":   "gjx用户登录",
					            "operationUserId":   "dgywahdio82139wqeq712831",
					            "operationTime":   "2020-09-04 08:12:45",
					            "logCont":   "北京市河北的！！！"        
				}    
			}
		},
		jk10: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"pageNum":  0,
				        "pageSize":  10,
				        "totalPage":  28,
				        "total":  274,
				        "list":  [            {                
					"id":   "L7jmM3QBCUEUMczdSkPT",
					                "systemSign":  1,
					                "softwareSign":  2,
					                "logType":  3,
					                "moduleSign":  21,
					                "operationType":  4,
					                "operationDesc":   "ceshi227221",
					                "operationUserId":   "zhang227221",
					                "operationUserName":   "zhang227221",
					                "operationTime":   "2020-01-01 03:01:05",
					                "logCont":   "2020-11-02 01:09:12",
					                "requestIp":   "289ip",
					                "collectTime":   "2020-08-28 15:09:14"            
				}        ]    
			}
		},
		jk4: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"pageNum":  1,
				        "pageSize":  2,
				        "totalPage":  1,
				        "total":  2,
				        "list":  [            {                
						"id":  41,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-26 16:09:51",
						                "status":   "1"            
					},              {                
						"id":  42,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-27 16:17:32",
						                "status":   "2"            
					},              {                
						"id":  43,
						                "name":   "统计呵呵",
						                "type":   "2",
						                "cycleSign":   "1",
						                "ruleDesc":   "统计嘻嘻",
						                "createTime":   "2020-08-28 17:19:22",
						                "status":   "2"            
					},              {                
						"id":  44,
						                "name":   "统计请问",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计人格",
						                "createTime":   "2020-08-29 16:17:32",
						                "status":   "2"            
					},          {                
						"id":  42,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-27 16:17:32",
						                "status":   "2"            
					},              {                
						"id":  43,
						                "name":   "统计呵呵",
						                "type":   "2",
						                "cycleSign":   "1",
						                "ruleDesc":   "统计嘻嘻",
						                "createTime":   "2020-08-28 17:19:22",
						                "status":   "2"            
					},              {                
						"id":  44,
						                "name":   "统计请问",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计人格",
						                "createTime":   "2020-08-29 16:17:32",
						                "status":   "2"            
					},
					{                
						"id":  42,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-27 16:17:32",
						                "status":   "2"            
					},              {                
						"id":  43,
						                "name":   "统计呵呵",
						                "type":   "2",
						                "cycleSign":   "1",
						                "ruleDesc":   "统计嘻嘻",
						                "createTime":   "2020-08-28 17:19:22",
						                "status":   "2"            
					},              {                
						"id":  44,
						                "name":   "统计请问",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计人格",
						                "createTime":   "2020-08-29 16:17:32",
						                "status":   "2"            
					},
					{                
						"id":  42,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-27 16:17:32",
						                "status":   "2"            
					},              {                
						"id":  43,
						                "name":   "统计呵呵",
						                "type":   "2",
						                "cycleSign":   "1",
						                "ruleDesc":   "统计嘻嘻",
						                "createTime":   "2020-08-28 17:19:22",
						                "status":   "2"            
					},              {                
						"id":  44,
						                "name":   "统计请问",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计人格",
						                "createTime":   "2020-08-29 16:17:32",
						                "status":   "2"            
					},
					{                
						"id":  42,
						                "name":   "统计系統每天的用户上线量",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计系統每天的用户上线量",
						                "createTime":   "2020-08-27 16:17:32",
						                "status":   "2"            
					},              {                
						"id":  43,
						                "name":   "统计呵呵",
						                "type":   "2",
						                "cycleSign":   "1",
						                "ruleDesc":   "统计嘻嘻",
						                "createTime":   "2020-08-28 17:19:22",
						                "status":   "2"            
					},              {                
						"id":  44,
						                "name":   "统计请问",
						                "type":   "1",
						                "cycleSign":   "2",
						                "ruleDesc":   "统计人格",
						                "createTime":   "2020-08-29 16:17:32",
						                "status":   "2"            
					},         
				]    
			}
		},
		jk8: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"total":  15,
				        "totalPage":  2,
				        "pageNum":  1,
				        "pageSize":  10,
				        "list":  [            {                
					"id":  33,
					                "cycleStatTastId":  2,
					                "createTime":   "2020-09-03 14:53:05",
					                "status":   "1"            
				},              {                
					"id":  34,
					                "cycleStatTastId":  2,
					                "createTime":   "2020-08-27 16:17:32",
					                "status":   "2"            
				},              {                
					"id":  32,
					                "cycleStatTastId":  2,
					                "createTime":   "2020-08-26 16:09:51",
					                "status":   "3"            
				},          ]    
			}
		},
		jk9: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"total":  15,
				        "totalPage":  2,
				        "pageNum":  1,
				        "pageSize":  10,
				        "hits":  [            {                
						"logCont":   "2020-07-01 11:11:10",
						                "logType":  2,
						                "collectTime":   "2020-09-03 14:53:05",
						                "operationUserId":   "zhang0111",
						                "softwareSign":  1,
						                "moduleSign":  11,
						                "operationType":  4,
						                "requestIp":   "354ip",
						                "id":   "p7i9UnQBCUEUMczdhcgX",
						                "operationDesc":   "ceshi0111",
						                "systemSign":  1,
						                "operationTime":   "2020-08-09 05:07:11"            
					},
					{                
						"logCont":   "2020-08-01 14:15:19",
						                "logType":  2,
						                "collectTime":   "2020-05-06 14:53:53",
						                "operationUserId":   "lisi2323",
						                "softwareSign":  2,
						                "moduleSign":  12,
						                "operationType":  3,
						                "requestIp":   "355ip",
						                "id":   "p7i9UnQBCUEUMczdhcgY",
						                "operationDesc":   "ceshi0122",
						                "systemSign":  1,
						                "operationTime":   "2020-07-05 08:12:31"            
					}        
				],
				        "chartResultList":  [            {                
					"chartTemplateId":  11,
					                "pieDataList":  [                    {                        
						"name":   "2020-01-01",
						                        "value":  1                    
					},                      {                        
						"name":   "2020-02-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-03-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-04-01",
						                        "value":  1                    
					},                      {                        
						"name":   "2020-05-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-06-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-07-01",
						                        "value":  3                    
					},                      {                        
						"name":   "2020-08-01",
						                        "value":  3                    
					},                      {                        
						"name":   "2020-09-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-10-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-11-01",
						                        "value":  1                    
					}                ],
					                "chartName":   "每日用户登入量1",
					                "chartType":  1            
				},              {                
					"noPieDataMap":  {                    
						"yDataList":  [                        {                            
							"data":  [                                1,                                 2,                                 2,                                 1,                                 0,                                 0,                                 3,                                 3,                                 0,                                 2,                                 1                            ],
							                            "name":   "bucketnei_id_count"                        
						}                    ],
						                    "xDataList":  [                        "2020-01-01",                         "2020-02-01",                         "2020-03-01",                         "2020-04-01",                         "2020-05-01",                         "2020-06-01",                         "2020-07-01",                         "2020-08-01",                         "2020-09-01",                         "2020-10-01",                         "2020-11-01"                    ]                
					},
					                "chartTemplateId":  22,
					                "chartName":   "每日用户登入量2",
					                "chartType":  2            
				}        ]    
			}
		},
		jk6: {    
			"code":  200,
			    "message":   "操作成功",
			    "data":  {        
				"total":  15,
				        "totalPage":  2,
				        "pageNum":  1,
				        "pageSize":  10,
				        "hits":  [            {                
					"logCont":   "2020-07-01 11:11:10",
					                "logType":  2,
					                "collectTime":   "2020-09-03 14:53:05",
					                "operationUserId":   "zhang0111",
					                "softwareSign":  1,
					                "moduleSign":  11,
					                "operationType":  4,
					                "requestIp":   "354ip",
					                "id":   "p7i9UnQBCUEUMczdhcgX",
					                "operationDesc":   "ceshi0111",
					                "systemSign":  1,
					                "operationTime":   "2020-08-09 05:07:11"            
				}        ],
				        "chartResultList":  [            {                
					"chartTemplateId":  11,
					                "pieDataList":  [                    {                        
						"name":   "2020-01-01",
						                        "value":  1                    
					},                      {                        
						"name":   "2020-02-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-03-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-04-01",
						                        "value":  1                    
					},                      {                        
						"name":   "2020-05-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-06-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-07-01",
						                        "value":  3                    
					},                      {                        
						"name":   "2020-08-01",
						                        "value":  3                    
					},                      {                        
						"name":   "2020-09-01",
						                        "value":  0                    
					},                      {                        
						"name":   "2020-10-01",
						                        "value":  2                    
					},                      {                        
						"name":   "2020-11-01",
						                        "value":  1                    
					}                ],
					                "chartName":   "每日用户登入量",
					                "chartType":  1            
				},              {                
					"noPieDataMap":  {                    
						"yDataList":  [                        {                            
							"data":  [                                1,                                 2,                                 2,                                 1,                                 0,                                 0,                                 3,                                 3,                                 0,                                 2,                                 1                            ],
							                            "name":   "bucketnei_id_count"                        
						}                    ],
						                    "xDataList":  [                        "2020-01-01",                         "2020-02-01",                         "2020-03-01",                         "2020-04-01",                         "2020-05-01",                         "2020-06-01",                         "2020-07-01",                         "2020-08-01",                         "2020-09-01",                         "2020-10-01",                         "2020-11-01"                    ]                
					},
					                "chartTemplateId":  22,
					                "chartName":   "每日用户登入量",
					                "chartType":  3            
				}        ]    
			}
		}

	},
	mutations: {
		setDict(state, dict) {
			state.dict = dict
		}
	},
	actions: {},
	getters: {
		getDict: state => state.dict
	},
	modules: {},

})

//接口4
//  {
//    "code": 200,
//    "message": "操作成功",
//    "data": {
//        "pageNum": 2,
//        "pageSize": 2,
//        "totalPage": 2,
//        "total": 2,
//        "list": [
//            {
//                "id": 43,
//                "name": "统计呵呵",
//                "type": "2",
//                "cycleSign": "1",
//                "ruleDesc": "统计嘻嘻",
//                "createTime": "2020-08-28 17:19:22",
//                "status": "2"
//            },
//            {
//                "id": 44,
//                "name": "统计请问",
//                "type": "1",
//                "cycleSign": "2",
//                "ruleDesc": "统计人格",
//                "createTime": "2020-08-29 16:17:32",
//                "status": "2"
//            }
//	        ]
//	    }
//		}],
//}

//接口5请求参数
//  jk5:{
//	"name": "用户登录异常告警规则配置",
//	"type": "2",
//	"cycleSign": "1",
//	"ruleDesc": "用户登录异常告警规则配置",
//	"queryRuleJson": {
//		"queryANDList": [{
//			"fieldName": "systemSign",
//			"relationSign": "eq",
//			"targetValue": 1
//		}, {
//			"fieldName": "operationType",
//			"relationSign": "eq",
//			"targetValue": 4
//		}, {
//			"fieldName": "logType",
//			"relationSign": "eq",
//			"targetValue": 2
//		}],
//		"timeRangeSign": "oneYear",
//		"bucketBO": {
//			"fieldName": "operationUserId",
//			"bucketName": "user_id_bucket",
//			"type": "normal",
//			"aggregationBOList": [{
//				"fieldName": "_id",
//				"aggName": "bucketnei_id_count",
//				"aggSign": "count"
//			}]
//		},
//		"aggOutList": [{
//			"fieldName": "_id",
//			"aggName": "user_sum",
//			"aggSign": "count"
//		}]
//	},
//	"cycleStatTast": {
//		"cycleUnit": "minute",
//		"cycleNum": "2",
//		"startTime": "2020-08-27 00:00:00",
//		"endTime": "2021-08-27 00:00:00"
//	},
//	"aardList": [{
//			"ruleName": "十分钟登录次数超过5次",
//			"bucketName": "user_id_bucket",
//			"resultFiledName": "bucketnei_id_count",
//			"aggregationSign": "1",
//			"relationSign": "gt",
//			"alarmRank": 1,
//			"targetNumValue": 5
//		},
//		{
//			"ruleName": "十分钟登录次数超过10次",
//			"bucketName": "user_id_bucket",
//			"resultFiledName": "bucketnei_id_count",
//			"aggregationSign": "1",
//			"relationSign": "gt",
//			"alarmRank": 1,
//			"targetNumValue": 10
//		},
//		{
//			"ruleName": "十分钟登录次数超过20次",
//			"bucketName": "user_id_bucket",
//			"resultFiledName": "bucketnei_id_count",
//			"aggregationSign": "1",
//			"relationSign": "gt",
//			"alarmRank": 1,
//			"targetNumValue": 20
//		}
//	]
//}