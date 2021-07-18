<template>
  <div class="addRule">
    <el-steps :active="active" align-center style="margin-bottom: 20px;" finish-status="success">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
    </el-steps>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small" autocomplete =‘true’>
      <el-row v-show="active===1">
        <el-col :span="8">
          <el-form-item label="规则名称" prop="name" required>
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规则描述" prop="ruleDesc">
            <el-input v-model="ruleForm.ruleDesc"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="规则类型" prop="type">
            <el-radio-group v-model="ruleForm.type">
              <el-radio label="1">审计分析规则</el-radio>
              <el-radio label="2">告警规则</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row v-show="active===1">
        <el-col :span="24">
          <el-form-item label="设置周期统计标识" props="type" label-width="150px">
            <el-radio-group v-model="ruleForm.cycleSign" @change="changeCycle">
              <el-radio label="2" v-if="ruleForm.type!=='2'">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <span v-if="ruleForm.cycleSign==='1'" style="margin-left: 10px;">
              <!--<span>时间范围： </span>
              <el-date-picker  v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right" ></el-date-picker>-->
              <el-form-item label="时间范围" prop="showTime" :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">
              <el-date-picker v-model="ruleForm.showTime"  type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          		</el-form-item>
              
              <span>频率： </span>
          <el-input-number v-model="ruleForm.cycleStatTastDetailDTO.cycleNum" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          <el-select v-model="ruleForm.cycleStatTastDetailDTO.cycleUnit" placeholder="请选择" style="width:100px;">
            <el-option v-for="item in dict['016']['dataValue']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item v-show="active===1" label="规则">
        <configuration-z @config="config" :ruleForm="ruleForm" :rules="ruleForm.formData" ref="ConfigurationZ"></configuration-z>
        <!--<configuration-z v-bind="$props" :rules="ruleForm.formData" ref="Configuration"></configuration-z>-->
      </el-form-item>

      <div v-show="active===2&&ruleForm.type==='1'">
        <el-form-item label="已配置图表" prop="chartList" >
        <!--<el-form-item label="已配置图表" prop="chartList" v-if="ruleForm.type==='1'&&ruleForm.queryRuleJson.bucketBO.aggregationBOList[0].arr.length>0">-->
          <chart-list-z @chartList="chartList" :ruleForm="ruleForm" ></chart-list-z>
        </el-form-item>
        <el-form-item label="图文配置" >
        <!--<el-form-item label="图文配置" v-if="ruleForm.type==='1'&&ruleForm.queryRuleJson.bucketBO.aggregationBOList[0].arr.length>0">-->
          <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
            <el-tab-pane label="饼图" name="pie" v-show="ruleForm.type==='1'">
              <pie-z v-show="activeTab==='pie'" :obj="ruleForm.queryRuleJson.bucketBO"></pie-z>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="histogram" v-show="ruleForm.type==='1'">
              <histogram-z v-show="activeTab==='histogram'" :obj="ruleForm.queryRuleJson.bucketBO"></histogram-z>
            </el-tab-pane>
            <el-tab-pane label="折线图" name="line" v-show="ruleForm.type==='1'">
              <line-chart-z v-show="activeTab==='line'" :obj="ruleForm.queryRuleJson.bucketBO"></line-chart-z>
            </el-tab-pane>
          </el-tabs>
        </el-form-item>

        <el-form-item label="表格配置" prop="showTable">
          <span>统计结果是否以列表形式显示</span>
          <el-radio-group v-model="ruleForm.showTable">
            <el-radio :label="0">是</el-radio>
            <el-radio :label="1" :disabled="ruleForm.queryRuleJson.bucketBO.aggregationBOList.length===0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div v-show="active===2&&ruleForm.type==='2'">
        <add-alarm-rule-z :alls="ruleForm"  :obj="ruleForm.queryRuleJson.bucketBO" :obj2="ruleForm.queryRuleJson.aggOutList" @alarmRule="alarmRule"></add-alarm-rule-z>
      </div>

      <el-form-item class="center">
        <!--<el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>-->
        <el-button v-show="active>1" size="small" type="default" @click="preStep()">上一步</el-button>
        <el-button v-show="active<2" size="small" type="primary" @click="nextStep('ruleForm')">下一步</el-button>
        <el-button v-if="active===2" size="small" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const API = '/api'
	import PieZ from "@/components/PieZ";
  import HistogramZ from "@/components/HistogramZ";
  import LineChartZ from "@/components/LineChartZ";
  import ChartListZ from "@/components/ChartListZ";
  import ConfigurationZ from "@/components/ConfigurationZ";
  import AddAlarmRuleZ from "@/components/AddAlarmRuleZ";
  export default {
		name: "ChangeRule",
    components: {AddAlarmRuleZ, ConfigurationZ, ChartListZ, LineChartZ, HistogramZ, PieZ},
    props: ['detail'],
    data() {
		  return {
		  	checkSign:false,
		    // 步骤
        active: 1,
        ruleForm: {
          name: '',
          type: '1',
          cycleSign: '2',
          ruleDesc: '',
          showTime: [],
          //子组件表单
          formData:{},
          // 规则
          queryRuleJson: {
            // and逻辑
            queryANDList: [],
            // or逻辑
            queryORList: [],
            // 桶外聚合组
            aggOutList: [],
            // 时间范围
            timeRangeSign: '',
            // 分桶信息
            bucketBO: {
              aggregationBOList: [{
                fieldName: '',
                aggName: '',
                aggSign: '',
                arr: [],
              }]
            },
            
          },
          cycleStatTast: {
            cycleUnit: 'minute',
            cycleNum: 1,
            startTime: '',
            endTime: ''
          },
          // 是否显示表格
          showTable: 0,
          // 告警规则
          aardList: [{
            ruleName: '',
            bucketName: '',
            resultFiledName: '',
            aggregationSign: '',
            relationSign: '',
            alarmRank: 1,
            targetNumValue: 1,
            targetStrValue: '',
            maxValue: 0,
            minValue: 0
          }],
          arctList: []
        },
        // 保存时传参对象
        params: {},
        rules: {
          name: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
          ],
          showTime:{ required: true, message: '请选择时间范围', trigger:['blur','change'] },
        },
        // 日期快捷键
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // 图标配置
        activeTab: 'pie',
        // 字典表
        dict: JSON.parse(localStorage.getItem('dict')),
      }
    },
    created() {
    	console.log('看看：',this.detail)
    	function deepClone(source){
//const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  const targetObj = typeof source === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for(let keys in source){ // 遍历目标
    if(source.hasOwnProperty(keys)){
      if(source[keys] && (typeof source[keys] === 'Object'||typeof source[keys] === 'Array')){ // 如果值是对象，就递归一下
//      targetObj[keys] = source[keys].constructor === Array ? [] : {};
  			targetObj[keys] = typeof source === Array ? [] : {}; // 判断复制的目标是数组还是对象
        targetObj[keys] = deepClone(source[keys]);
      }else{ // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
    	this.ruleForm=deepClone(this.detail)
//  	this.ruleForm=this.detail;
    	this.ruleForm.showTime=[]
//可行一
//  	this.ruleForm.showTime=this.$store.state.formDatas.showTime
//未实现二	
    	this.ruleForm.showTime.push(this.detail.cycleStatTastDetailDTO.startTime)
    	this.ruleForm.showTime.push(this.detail.cycleStatTastDetailDTO.endTime)
//未实现三
//		this.ruleForm.showTime[0]=this.detail.cycleStatTastDetailDTO.startTime
//		this.ruleForm.showTime[1]=this.detail.cycleStatTastDetailDTO.endTime
//四	可行
//  	this.ruleForm.showTime[0]=this.$store.state.formDatas.showTime[0]
//			this.ruleForm.showTime[1]=this.$store.state.formDatas.showTime[1]
//五 可行
//  	this.ruleForm.showTime.push(this.$store.state.formDatas.showTime[0])
//  	this.ruleForm.showTime.push(this.$store.state.formDatas.showTime[1])			
			
//  	this.$refs.ConfigurationZ.formData=this.detail.queryRuleJson
//  	console.log('看看数据：',this.ruleForm,'看看类型',typeof this.detail.cycleStatTastDetailDTO.startTime)
    	console.log('看看数据：',this.ruleForm,this.detail)
    },
    mounted() {
//  	console.log(this.checkForm('ruleForm'))
    },
    watch: {
		  // 监听表单
      ruleForm: {
        handler(newValue, oldValue) {
          if (newValue.type === '2') { // 如果是告警规则
            newValue.cycleSign = '1' // 那么必须是周期性统计
            this.activeTab = '' // 告警规则仅显示表格
          } else {
            this.activeTab = 'pie'
          }
          this.ruleForm=newValue
        	console.log('测试监听',this.ruleForm)
        },
        deep: true,
        immediate:true,
      },
      'ruleForm.showTime': {
        handler(newValue, oldValue) {
        	this.ruleForm.showTime=newValue
        	console.log('测试监听Time',this.ruleForm.showTime)
        },
        deep: true
      }
    },
    methods: {
    	csFn(){
      	this.active = 2;
      	alert('测试函数已执行')
      },
		  // 上一步
      preStep() {this.active=1},
      // 下一步
      nextStep(fm){
//  		let list =[]
//  		list.push(
//  			this.checkForm(fm),
//  			this.$refs.Configuration.checkForm('formData'),
//  			this.$refs.Configuration.checkForm('formData.bucketBO'),
//  			this.$refs.Configuration.checkForm('formData.obj'),
//  		)
//  		Promise.all(list).then(()=>{
      			this.active=2
//    		this.$message.success('验证---通过！请点击下一步')
//  		}).catch(()=>{
//    		this.$message.error('请填写必填项！')
//  			return false
//  		})
    	},
//    nextStep(fm) {
//    	console.log(1111111111111111)
//    		this.checkForm(fm)
//    	console.log(2222222222)
//    		this.$refs.Configuration.submitForm2()
//    	console.log(333333333333333)
//    	return new Promise((resolve,reject)=>{
//    	console.log(44444444444444)
//    		if(this.checkSign&&this.$refs.Configuration.checkSign){
//    			resolve()
////    			this.active=2
//    		}else{
//    	console.log(55555555555555)
//    			reject()
//    		}
//    	})
//    	.then(()=>{
//    		this.active=2
//						console.log(666666,this.active)
//    	})
//    },
      //规则验证
      checkForm(fm){
      	return new Promise((resolve,reject)=>{
      		this.$refs[fm].validate(valid=>{
      			if(valid){
      				resolve(this.checkSign=true)
      			}else{
      				reject()
      			}
      		})
      	})
//    	.then(()=>{
//    		this.$message.success('验证---通过！请点击下一步')
//    	})
      	.catch(()=>{this.$message.error('验证---失败！')})
//    	.then(()=>{this.$message.success('验证---通过！')})
//    	.catch(()=>{this.$message.error('验证---失败！')})
//    	.catch(()=>{alert('去改bug，谢谢')})
      },
		  // 保存规则
      submitForm(formName) {
      	
      	
      	
//    	let formList=[];
//    	list.push(
//    		this.checkForm('ruleForm')
//    	);
//					Promise.then(()=>{
//						this.$message.success('验证通过！！！')
//					}).catch(()=>{
//						this,$message.error('验证失败！！！')
//					})
					
//      this.$refs[formName].validate((valid) => {
//        if (valid) { // 验证必填信息通过
//          if (this.ruleForm.showTime.length > 0) {
//            this.ruleForm.cycleStatTastDetailDTO.startTime = this.moment(this.ruleForm.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
//            this.ruleForm.cycleStatTastDetailDTO.endTime = this.moment(this.ruleForm.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
//          }
//          for(let key in this.ruleForm) {
//            this.params[key] = this.ruleForm[key]
//          }
////          this.$axios.post(API + '/analyzeRule/addAnalyzeRule', this.params).then(r => {
////            console.log(r)
//
//						if(this.$store.state.jk5.code===200){
//            this.$message({
//              message: '保存成功！',
//              type: 'success'
//            })
//            this.$emit('closeAddRule', false)
//						}else{
//							this.$message({
//              message: '保存失败！',
//              type: 'error'
//            })
//						}
////            this.$emit('closeAuditRule', false)
////          }).catch(e => {
////            this.$message({
////              message: '保存失败：' + e,
////              type: 'warning'
////            })
////          })
//        }else {
//          this.$message({
//            message: '请填写必填信息',
//            type: 'warning'
//          })
//          return false
//        }
//     })
      },
      // 取消规则
      resetForm(formName) {
        this.$refs[formName].resetFields()
        // 关闭父组件弹框
        this.$emit('closeAddRule', false)
        // 恢复成第一步
        this.active = 1
        this.ruleForm = {
          name: '',
            type: '1',
            cycleSign: '2',
            ruleDesc: '',
            showTime: [],
            // 规则
            queryRuleJson: {
            // and逻辑
            queryANDList: [],
              // or逻辑
              queryORList: [],
              // 桶外聚合组
              aggOutList: [],
              // 时间范围
              timeRangeSign: '',
              // 分桶信息
              bucketBO: {
              aggregationBOList: []
            },
          },
          cycleStatTastDetailDTO: {
            cycleUnit: 'minute',
              cycleNum: 1,
              startTime: '',
              endTime: ''
          },
          // 是否显示表格
          showTable: 0,
            // 告警规则
            aardList: [{
            ruleName: '',
            bucketName: '',
            resultFiledName: '',
            aggregationSign: '',
            relationSign: '',
            alarmRank: 1,
            targetNumValue: 1,
            targetStrValue: '',
            maxValue: 0,
            minValue: 0
          }],
        }
      },
      // 是否周期性单选
      changeCycle(val) {
        if (val === '2') { // 2否  1是
          this.ruleForm.showTime = []
          this.ruleForm.cycleStatTastDetailDTO = {
            cycleUnit: 'minute',
            cycleNum: 1,
            startTime: '',
            endTime: ''
          }
        }
      },
      // configuration组件接收的值
      config(val) {
        for(let key in val) {
          this.ruleForm.queryRuleJson[key] = val[key]
//        this.ruleForm.formData = val
//console.log(val,1111111111111111,this.ruleForm.formData)
        }
      },
      // 审计图文组件接收的值
      chartList(val) {
        this.ruleForm.arctList = val
      },
      // 告警规则组件接收的值
      alarmRule(val) {
        this.ruleForm.aardList = val.rows
        console.log('告警事件传值',val,this.ruleForm.aardList)
      },
      
      // 周期变化
      handleChange(val) {
        console.log(val)
      },
      // 切换图表tab
      changeTab() {
        console.log(this.activeTab)
      },
    }
	}
</script>

<style scoped>
  .center{
    text-align: center;
  }
</style>
