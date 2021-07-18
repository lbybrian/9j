<template>
  <div class="config">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span><span style="color: #F56C6C">*&nbsp;</span>&nbsp;配置条件规则</span>
      </div>
      <el-form :inline="true" size="small" :model="formData" :rules="rules" ref="formData" class="demo-form-inline" autocomplete =‘true’>
        <el-row>
          <el-col :span="24">
            <el-form-item label="时间范围" prop="timeRangeSign">
              <el-select v-model="formData.timeRangeSign" clearable :disabled="cxTime" @change="cxTimeSelect" placeholder="选择时间范围">
                <el-option v-for="item in dict['015']['dataValue']" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="自定义" prop="showTime">
              <el-date-picker v-model="formData.showTime" :disabled="diyTime" @change="cxDiyTime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

				<div v-for="(row, index) in formData.queryANDList">
          <!--<el-form-item :label="index===0?'与':' '" :prop="'queryANDList.'+index+'.and'" :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">-->
          <el-form-item :label="index===0?'与':' '" :prop="'queryANDList.'+index+'.and'" >
            <el-cascader v-model="row.and" style="min-width: 400px" :options="dict['010']['dataValue']" collapse-tags @change="cxAndSelect(row.and, index)" clearable placeholder="选择字段与关系"></el-cascader>
          </el-form-item>
          <el-form-item :required="true" v-if="row.and[0]&&(row.and[0]==='operationUserId'||row.and[0]==='operationDesc'||row.and[0]==='logCont')">
            <el-input v-model="row.targetValue" @change="andInputChange" placeholder="请输入值"></el-input>
          </el-form-item>

          <el-form-item>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index===0" @click="addAnd(row)" class="el-icon-circle-plus-outline"></i>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index>0" @click="delAnd(row)" class="el-icon-remove-outline"></i>
          </el-form-item>
        </div>


        <div v-for="(row, index) in formData.queryORList">
          <el-form-item :label="index===0?'或':' '" :prop="'queryORList.'+index+'.or'">
            <el-cascader v-model="row.or" style="min-width: 400px" :options="dict['010']['dataValue']" collapse-tags @change="cxOrSelect(row.or, index)" clearable placeholder="选择字段与关系"></el-cascader>
          </el-form-item>

          <el-form-item :required="true" v-if="row.or[0]&&(row.or[0]==='operationUserId'||row.or[0]==='operationDesc'||row.or[0]==='logCont')">
            <el-input v-model="row.targetValue" @change="orInputChange" placeholder="请输入值"></el-input>
          </el-form-item>
          <el-form-item>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index===0" @click="addOr(row)" class="el-icon-circle-plus-outline"></i>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index>0" @click="delOr(row)" class="el-icon-remove-outline"></i>
          </el-form-item>
        </div>
        
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>配置分桶</span>
      </div>
      <!--<el-form :inline="true" size="small" :model="formData.bucketBO" :rules="rules" ref="formData.bucketBO" class="demo-form-inline">-->
      <el-form :inline="true" size="small" :model="formData.bucketBO" ref="formData.bucketBO" class="demo-form-inline">
        <div>
          <!--<el-form-item label="分 桶" :prop="'bucketBO'+'.typ'" :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">-->
          <el-form-item label="分 桶" prop="typ">
            <el-select v-model="formData.bucketBO.typ" clearable @change="selectBucket" placeholder="选择字段">
              <el-option v-for="item in dict['011']['dataValue']" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <!--<el-form-item label="桶别名" :prop="'bucketBO'+'.bucketName'" :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">-->
          <el-form-item label="桶别名" >
            <el-input v-model="formData.bucketBO.bucketName" placeholder="请输入桶别名"></el-input>
          </el-form-item>

          <el-form-item label="时间类型" v-if="formData.bucketBO.type==='date'" prop="dateType">
            <el-select v-model="formData.bucketBO.dateType" clearable placeholder="时间类型">
              <el-option v-for="item in dict['017']['dataValue']" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <div v-for="(row, index) in formData.bucketBO.aggregationBOList">
          <el-form-item :label="index===0?'桶内聚合':' '" :prop="'aggregationBOList.'+index+'.arr'" >
            <el-cascader v-model="row.arr" style="min-width: 400px" @change="selectInner(row, index)" :options="dict['012']['dataValue']" collapse-tags clearable placeholder="选择字段与标识"></el-cascader>
          </el-form-item>

          <el-form-item :prop="'aggregationBOList.'+index+'.aggName'" >
            <el-input v-model="row.aggName" placeholder="聚合名称"></el-input>
          </el-form-item>

          <el-form-item>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index===0" @click="addInner(row)" class="el-icon-circle-plus-outline"></i>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index>0" @click="delInner(row)" class="el-icon-remove-outline"></i>
          </el-form-item>
        </div>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>配置聚合</span>
      </div>
      <el-form :inline="true" size="small" :model="formData.obj" class="demo-form-inline" ref="formData.obj" >
        <div v-for="(row, index) in formData.aggOutList">
          <el-form-item :label="index===0?'桶外聚合':' '">
            <el-cascader v-model="row.arr" style="min-width: 400px" @change="selectOuter(row, index)" :options="dict['012']['dataValue']" collapse-tags clearable placeholder="选择字段与标识"></el-cascader>
          </el-form-item>

          <el-form-item :rules="{ required: true, message: '所填内容为空', trigger:['blur','change'] }">
            <el-input v-model="row.aggName" placeholder="聚合名称"></el-input>
          </el-form-item>

          <el-form-item>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index===0" @click="addOuter(row)" class="el-icon-circle-plus-outline"></i>
            <i style="font-size: 32px;color:#C0C4CC;" v-if="index>0" @click="delOuter(row)" class="el-icon-remove-outline"></i>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
	export default {
		name: "ConfigurationZ",
		props:['detail'],
    data() {
      return {
      	checkSign:false,//表单验证标识
        // 字典表
        dict: JSON.parse(localStorage.getItem('dict')),
        // 时间下拉和自定义二选一
        cxTime: false,
        diyTime: false,
        // 规则配置表单
        formData: {
          // 时间范围下拉
          timeRangeSign:'',
          // 自定义时间范围
          showTime: [],
          startTime: '',
          endTime: '',
          // 逻辑与
          queryANDList: [{
            fieldName: '',
            relationSign: '',
            targetValue: '',
            and: []
          }],
          // 逻辑或
          queryORList: [{
            fieldName: '',
            relationSign: '',
            targetValue: '',
            or: []
          }],
          // 分桶
          bucketBO: {
            fieldName: '',
            bucketName: '',
            typ: '',
            type: '',
            dateType: '',
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
        },
        rules: {
          timeRangeSign: { required: true, message: '请选择时间范围', trigger:['blur','change'] },
          showTime:{ required: true, message: '请选择时间范围', trigger:['blur','change'] },
      		typ:{ required: true, message: '所选内容为空', trigger:['blur','change'] },
      		dateType:{ required: true, message: '所选内容为空', trigger:['blur','change'] },
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
      }
    },
    watch:{
      formData:{
        handler(newVal){
//      	console.log('$11111111111')
          if (newVal.showTime !== null && newVal.showTime.length > 0&&newVal.queryANDList.length>0) {
            newVal.startTime = this.moment(newVal.showTime[0]).format("YYYY-MM-DD HH:mm:ss")
            newVal.endTime = this.moment(newVal.showTime[1]).format("YYYY-MM-DD HH:mm:ss")
          // }else if(){
//          for(let i in newVal.queryANDList){
//            newVal.and=newVal.queryANDList[i].and
//            // newVal.or=newVal.queryANDList[i].or
//            // console.log(newVal.queryANDList[i])
//          }
          }
           else {
            newVal.startTime = ''
            newVal.endTime = ''
          }
//        this.$emit('config', newVal)
        },
        deep: true,
//      immediate:true,
      }
    },
    created() {
        	console.log('z',this.$props.detail)
//  	this.$store.state.formDatas?this.$store.state.formDatas:this.formData;
//  	this.formData=this.$store.state.formDatas

    	
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
    	this.formData=deepClone(this.$props.detail.queryRuleJson)
//  	this.formData=this.detail;
    	this.formData.showTime=[]
//可行一
//  	this.formData.showTime=this.$store.state.formDatas.showTime
//未实现二	
if(this.$props.detail.cycleStatTastDetailDTO&&this.$props.detail.cycleStatTastDetailDTO.startTime&&this.$props.detail.cycleStatTastDetailDTO.endTime){
	this.formData.showTime.push(this.$props.detail.cycleStatTastDetailDTO.startTime)
	this.formData.showTime.push(this.$props.detail.cycleStatTastDetailDTO.endTime)
}
    	
    	for(let i=0;i<this.formData.bucketBO.aggregationBOList.length;i++){
    		this.formData.bucketBO.aggregationBOList[i].arr[i]=[]
    	}
    	for(let i in this.formData.queryANDList){
//  		this.formData.queryANDList[i].and[0]=[{fieldName: '',aggName: '',aggSign: '',}]
//  		this.formData.queryANDList[i].and=this.$props.detail.queryRuleJson.queryANDList
    		i.and[0]=i.fieldName
    		i.and[1]=i.relationSign
//  		dict['010']['dataValue']
    	}
//  	this.formData.queryANDList.and=this.$props.detail.queryRuleJson.queryANDList
    	for(let i in this.formData.queryORList){
    		this.formData.queryORList[i].or=[]
    	}
    	
    	this.formData.bucketBO.typ=this.formData.bucketBO.fieldName?this.formData.bucketBO.fieldName:''
//  	this.formData=this.formData;
//this.formData=this.formData
//this.formData.showTime=[]
//  	this.formData.showTime.push(this.$props.detail.cycleStatTastDetailDTO.startTime)
//  	this.formData.showTime.push(this.$props.detail.cycleStatTastDetailDTO.endTime)
    	console.log('z数据',this.formData,this.$props.detail.queryRuleJson)
    },
    mounted() {},
    beforeDestroy(){},
    methods: {
    	//多表单同时验证
//  	submitForm2(){
//  		let list =[]
//  		list.push(
//  			this.checkForm('formData'),
//  			this.checkForm('formData.bucketBO'),
//  			this.checkForm('formData.obj'),
//  		)
//  		Promise.all(list).then(()=>{
//  			this.checkSign=true
//    		this.$message.success('验证---通过！请点击下一步')
////  			this.$message.success('z验证---成功',this.checkSign)
////    	checkSign:false,//子表单验证标识
//  		}).catch(()=>{
////  			this.$message.error('z验证---失败',this.checkSign)
//    		this.$message.error('请填写必填项！')
//  			return false
//  		})
//  	},
    	//验证规则
    	checkForm(fm){
    		return new Promise((resolve,reject)=>{
	    		this.$refs[fm].validate(valid=>{
	    			if(valid){
	    				resolve()
	    			}else{
	    				reject()
	    			}
	    		})
    		})
    	},
//  	checkForm(fm){
//  		this.$refs[fm].validate(valid=>{
//  			if(valid){
//  				this.$message.success('z验证---成功')
//  			}else{
//  				this.$message.success('z验证---失败')
//  			}
//  		})
//  	},
    	
		  // 时间下拉
      cxTimeSelect(val) {
        if (val !== '') {
          this.diyTime = true
          this.formData.showTime=' '
          // this.formData.startTime = ''
          // this.formData.endTime = ' '
        } else {
          this.diyTime = false
        }
      },
      // 自定义事件
      cxDiyTime(val) {
        if (val !== null) {
          this.cxTime = true
          this.formData.timeRangeSign = ' '
        } else {
          this.cxTime = false
        }
      },
		  // 逻辑与下拉改变
      cxAndSelect(arr, index) {
        if (arr.length > 0) {
          if (arr[0]==='operationUserId'||arr[0]==='operationDesc'||arr[0]==='logCont') { // 二级
            this.formData.queryANDList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryANDList[index].relationSign = arr[1] ? arr[1] : ''
            // this.formData.queryANDList[index].targetValue =
          } else { // 三级
            this.formData.queryANDList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryANDList[index].relationSign = arr[1] ? arr[1] : ''
            this.formData.queryANDList[index].targetValue = arr[2] ? arr[2] : ''
          }
        } else {
          this.formData.queryANDList[index].targetValue = ''
        }
//      console.log(this.formData.queryANDList)
      },
      // 逻辑或下拉改变
      cxOrSelect(arr, index) {
        if (arr.length > 0) {
          if (arr[0]==='operationUserId'||arr[0]==='operationDesc'||arr[0]==='logCont') { // 二级
            this.formData.queryORList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryORList[index].relationSign = arr[1] ? arr[1] : ''
          } else { // 三级
            this.formData.queryORList[index].fieldName = arr[0] ? arr[0]: ''
            this.formData.queryORList[index].relationSign = arr[1] ? arr[1] : ''
            this.formData.queryORList[index].targetValue = arr[2] ? arr[2] : ''
          }
        } else {
          this.formData.queryORList[index].targetValue = ''
        }
//      console.log(this.formData.queryORList)
      },
      // 添加逻辑与行
      addAnd() {
        this.formData.queryANDList.push({
          fieldName: '',
          relationSign: '',
          targetValue: '',
          and: [],
        })
      },
      // 删除逻辑与行
      delAnd(row) {
        let index = this.formData.queryANDList.indexOf(row)
        if (index !== -1) {
          this.formData.queryANDList.splice(index, 1)
        }
      },
      // 逻辑与input变化必填
      andInputChange(val) {
        console.log(val)
      },
      // 逻辑或input变化必填
      orInputChange(val) {
        console.log(val)
      },
      // 添加逻辑或行
      addOr(row) {
        this.formData.queryORList.push({
          fieldName: '',
          relationSign: '',
          targetValue: '',
          or: [],
        })
      },
      // 删除逻辑或行
      delOr(row) {
        let index = this.formData.queryORList.indexOf(row)
        if (index !== -1) {
          this.formData.queryORList.splice(index, 1)
        }
      },
      // 选择分桶下拉时，设置桶别名
      selectBucket(val) {
        val !== '' ? this.formData.bucketBO.bucketName = val : this.formData.bucketBO.bucketName = ''
        if (val === 'collectTime' || val === 'operationTime') {
          this.formData.bucketBO.type = 'date'
        } else {
          this.formData.bucketBO.type = 'normal'
        }
//      this.formData.bucketBO.typ = this.formData.bucketBO.fieldName
        this.formData.bucketBO.fieldName = this.formData.bucketBO.typ
      },
      // 选择桶内聚合下拉
      selectInner(row, index) {
        if (row.arr.length > 0) {
          this.formData.bucketBO.aggregationBOList[index].fieldName = row.arr[0]
          this.formData.bucketBO.aggregationBOList[index].aggSign = row.arr[1]
          this.formData.bucketBO.aggregationBOList[index].aggName = row.arr[0] + row.arr[1] + index
        } else {
          this.formData.bucketBO.aggregationBOList[index].fieldName = ''
          this.formData.bucketBO.aggregationBOList[index].aggSign = ''
          this.formData.bucketBO.aggregationBOList[index].aggName = ''
        }
      },
      // 添加桶内行
      addInner(row) {
        this.formData.bucketBO.aggregationBOList.push({
          fieldName: '',
          aggName: '',
          aggSign: '',
          arr: [],
        })
      },
      // 删除桶内行
      delInner(row) {
        let index = this.formData.bucketBO.aggregationBOList.indexOf(row)
        if (index !== -1) {
          this.formData.bucketBO.aggregationBOList.splice(index, 1)
        }
      },
      // 选择桶外聚合下拉
      selectOuter(row, index) {
        if (row.arr.length > 0) {
          this.formData.aggOutList[index].fieldName = row.arr[0]
          this.formData.aggOutList[index].aggSign = row.arr[1]
          this.formData.aggOutList[index].aggName = row.arr[0] + row.arr[1] + index
        } else {
          this.formData.aggOutList[index].fieldName = ''
          this.formData.aggOutList[index].aggSign = ''
          this.formData.aggOutList[index].aggName = ''
        }
      },
      // 添加桶外行
      addOuter(row) {
        this.formData.aggOutList.push({
          fieldName: '',
          aggName: '',
          aggSign: '',
          arr: [],
        })
      },
      // 删除桶外行
      delOuter(row) {
        let index = this.formData.aggOutList.indexOf(row)
        if (index !== -1) {
          this.formData.aggOutList.splice(index, 1)
        }
      },
    }
	}
</script>
<style>
	.demo-form-inline >>> .el-form-item{
  	background-color: red;
  }
</style>
<style scoped>
  .box-card{
    margin-bottom: 10px;
  }
  .el-card__header{
    padding: 2px 20px;
  }
  
</style>
