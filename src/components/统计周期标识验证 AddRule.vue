<template>
  <div class="addRule">
  	<div class="center"></div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="即时审计" name="1">
        <el-row class="center ruleList" v-show="activeName==='1'">
          <el-col :span="4" v-for="item in tableData" :key="item.id">
            <div @click="checkRule(item)">{{item.name}}</div>
          </el-col>
        </el-row>
        <audit-js v-if="activeName==='1'" :jsId="jsId"></audit-js>
      </el-tab-pane>

      <el-tab-pane label="周期审计" name="2">
        <el-row class="center ruleList" v-show="activeName==='2'">
          <el-col :span="4" v-for="item in tableData2" :key="item.id">
            <div @click="checkRule2(item)">{{item.name}}</div>
          </el-col>
        </el-row>
        <cycle-audit-list v-if="activeName==='2'" :cycleId="cycleId"></cycle-audit-list>
      </el-tab-pane>
    </el-tabs>

<el-button type="default" @click="addRule" style="position: absolute; z-index: 9999999!important;">表单验证</el-button>
<!--详情弹框-->
    <!--<el-dialog  :visible.sync="addRuleVisible" width="80%">-->
    <el-dialog v-if="addRuleVisible" :visible.sync="addRuleVisible" width="80%">
      <span slot="title">表单验证</span>
      	<form-yz></form-yz>
      	<!--<form-yz v-show="obj.id!==''" :obj="obj"></form-yz>-->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRuleVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small" autocomplete =‘true’>
      <el-row v-if="active===1">
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


			<el-row v-if="active===1">
        <el-col :span="24">
        	<span>设置周期统计标识:</span>
        	<el-radio-group v-model="ruleForm.cycleSign" @change="changeCycle">
              <el-radio label="2" v-if="ruleForm.type!=='2'">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <span v-if="ruleForm.cycleSign==='1'" style="margin-left: 10px;">
            
          <el-form-item label="时间范围" prop="showTime" :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">
              <el-date-picker v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
          </el-form-item>
            <el-form-item label="频率" prop="">
              <el-input-number v-model="ruleForm.cycleStatTast.cycleNum" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          <el-select v-model="ruleForm.cycleStatTast.cycleUnit" placeholder="请选择" style="width:100px;">
            <el-option v-for="item in dict['016']['dataValue']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
            </el-form-item>
        	</span>
        </el-col>
      </el-row>


      <!--<el-row v-if="active===1">
        <el-col :span="24">
          <el-form-item label="设置周期统计标识" prop="showTime" label-width="150px" >
            <el-radio-group v-model="ruleForm.cycleSign" @change="changeCycle">
              <el-radio label="2" v-if="ruleForm.type!=='2'">否</el-radio>
              <el-radio label="1">是</el-radio>
            </el-radio-group>
            <span v-if="ruleForm.cycleSign==='1'" style="margin-left: 10px;">
              <span>时间范围： </span>
              <el-date-picker v-model="ruleForm.showTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
              <span>频率： </span>
          <el-input-number v-model="ruleForm.cycleStatTast.cycleNum" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          <el-select v-model="ruleForm.cycleStatTast.cycleUnit" placeholder="请选择" style="width:100px;">
            <el-option v-for="item in dict['016']['dataValue']" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </span>
          </el-form-item>
        </el-col>
      </el-row>-->

      <el-form-item v-if="active===1" label="规则">
        <configuration @config="config"  :ruleForm="ruleForm"></configuration>
      </el-form-item>

      <div v-if="active===2&&ruleForm.type==='1'">
        <el-form-item label="已配置图表" prop="chartList" v-if="ruleForm.type==='1'&&ruleForm.queryRuleJson.bucketBO.aggregationBOList[0].arr.length>0">
          <chart-list @chartList="chartList"></chart-list>
        </el-form-item>

        <el-form-item label="图文配置" v-if="ruleForm.type==='1'&&ruleForm.queryRuleJson.bucketBO.aggregationBOList[0].arr.length>0">
          <el-tabs v-model="activeTab" type="card" @tab-click="changeTab">
            <el-tab-pane label="饼图" name="pie" v-if="ruleForm.type==='1'">
              <pie v-if="activeTab==='pie'" :obj="ruleForm.queryRuleJson.bucketBO"></pie>
            </el-tab-pane>
            <el-tab-pane label="柱状图" name="histogram" v-if="ruleForm.type==='1'">
              <histogram v-if="activeTab==='histogram'" :obj="ruleForm.queryRuleJson.bucketBO"></histogram>
            </el-tab-pane>
            <el-tab-pane label="折线图" name="line" v-if="ruleForm.type==='1'">
              <line-chart v-if="activeTab==='line'" :obj="ruleForm.queryRuleJson.bucketBO"></line-chart>
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
      <div v-if="active===2&&ruleForm.type==='2'">
        <add-alarm-rule :obj="ruleForm.queryRuleJson.bucketBO" :obj2="ruleForm.queryRuleJson.aggOutList" @alarmRule="alarmRule"></add-alarm-rule>
      </div>

      <el-form-item class="center">
        <!--<el-button size="small" @click="resetForm('ruleForm')">取 消</el-button>-->
        <el-button v-if="active>1" size="small" type="default" @click="preStep()">上一步</el-button>
        <el-button v-if="active<2" size="small" type="primary" @click="nextStep()">下一步</el-button>
        <el-button v-if="active===2" size="small" type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const API = '/api'
  import FormYz from "@/components/FormYz";
	import Pie from "@/components/Pie";
  import Histogram from "@/components/Histogram";
  import LineChart from "@/components/LineChart";
  import ChartList from "@/components/ChartList";
  import Configuration from "@/components/Configuration";
  import AddAlarmRule from "@/components/AddAlarmRule";
  export default {
		name: "AddRule",
    components: {AddAlarmRule, Configuration, ChartList, LineChart, Histogram, Pie,FormYz},
    props: [],
    data() {
		  return {
		  	addRuleVisible:false,
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
//        showTime:{ required: true, message: '请选择时间范围', trigger:['blur','change'] },
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
    },
    mounted() {
    	console.log(5555555,this.$store.state.formDatas)
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
        },
        
         formData: {
           handler(newValue, oldValue) {
           	this.$store.state.formDatas
           },
           deep: true
         },
    
        deep: true
      }
    },
    methods: {
		  // 上一步
      preStep() {
    	this.ruleForm.formData=this.$store.state.formDatas?this.$store.state.formDatas:this.ruleForm.formData;
//      this.ruleForm.formData=this.$store.state.formDatas
//      this.ruleForm=sessionStorage.getItem('ruleForm')?sessionStorage.getItem('ruleForm'):'';
        console.log('上一步',this.ruleForm.formData.startTime)
        if (this.active-- < 0) this.active = 0
      },
      // 下一步
      nextStep() {
        this.$store.state.formDatas=this.ruleForm.formData
        console.log('下一步',this.ruleForm.formData.startTime)
        if (this.active++ > 2) this.active = 0
        this.submitForm('ruleForm')
//    	sessionStorage.setItem('ruleForm', JSON.stringify(this.ruleForm))
//    	sessionStorage.setItem('queryRuleJson', JSON.stringify(this.ruleForm.queryRuleJson))
//    	sessionStorage.setItem('bucketBO', JSON.stringify(this.ruleForm.queryRuleJson.bucketBO))
//    	sessionStorage.setItem('aggregationBOList', JSON.stringify(this.ruleForm.queryRuleJson.bucketBO.aggregationBOList))
//    	localStorage.setItem('fieldName', JSON.stringify(this.ruleForm.queryRuleJson.bucketBO.aggregationBOList.fieldName))
        
      },
      // 是否周期性单选
      changeCycle(val) {
        if (val === '2') { // 2否  1是
          this.ruleForm.showTime = []
          this.ruleForm.cycleStatTast = {
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
        }
      },
      // 审计图文组件接收的值
      chartList(val) {
        this.ruleForm.arctList = val
      },
      // 告警规则组件接收的值
      alarmRule(val) {
        this.ruleForm.aardList = val.rows
      },
		  // 保存规则
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { // 验证必填信息通过
            if (this.ruleForm.showTime.length > 0) {
              this.ruleForm.cycleStatTast.startTime = this.moment(this.ruleForm.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
              this.ruleForm.cycleStatTast.endTime = this.moment(this.ruleForm.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
            }
            for(let key in this.ruleForm) {
              this.params[key] = this.ruleForm[key]
            }
          } else {
          	
            this.$message({
              message: '请填写必填信息',
              type: 'warning'
            })
            return false
          }
        });
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
        }
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
