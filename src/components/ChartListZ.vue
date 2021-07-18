<template>
  <div>
    <el-table v-if="tableData.length>0" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="charType" label="类型" width="100">
        <template slot-scope="scope">
          <div v-if="scope.row.charType==1">饼图</div>
          <div v-if="scope.row.charType==2">柱状图</div>
          <div v-if="scope.row.charType==3">折线图</div>
        </template>
      </el-table-column>
      <el-table-column label="图表属性">
        <template slot-scope="scope">
          <div>
            <span>图表名称：{{scope.row.chartName}}, </span>
            <span>图例：{{scope.row.axisX}}, </span>
            <span v-if="scope.row.yAxis">数据值：{{scope.row.yAxis}}</span>
            <span v-if="!scope.row.yAxis">数据值：{{scope.row.axisYArr.join(',')}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="120">
        <template slot-scope="scope">
          <!--<el-button @click="check(scope)" type="text" size="small">预览</el-button>-->
          <el-button @click="del(scope)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else style="color: #F56C6C; font-size: 12px;">* 请配置以下图表信息</div>

    <el-dialog title="图表预览" :modal="false" :visible.sync="chartVisible" width="40%">
      <div>图表</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="chartVisible = false" type="primary" size="small">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
		name: "ChartListZ",
		props:['ruleForm'],
    data() {
		  return {
        loading: true,
        // 数据列表
        tableData: [],
        // 饼图
        pie: [],
        // 柱状图
        histogram: [],
        // 折线图
        lineChart: [],
        chartVisible: false,
      }
    },
    created() {
		  this.loading = false
		  			console.log('来源数',this.ruleForm)
		  			
//		  let qqq=this.ruleForm.arctList
//		  let aaa=this.tableData
		  
//		  for(let i=0;i<qqq.length;i++){
		  for(let i=0;i<this.ruleForm.arctList.length;i++){
		  	(i=>{
		  		let item ={}
//		  this.ruleForm.arctList.map(item=>{//多层循环效果为循环9次
		  		
		  		setTimeout(()=>{
//		  			console.log('赋值前11111111111',item)
		  			item.axisYArr=[]
		  			item.chartRuleId=this.ruleForm.arctList[i].analyRuleId
		  			item.axisX=this.ruleForm.arctList[i].xAxis
		  			item.yAxis=this.ruleForm.arctList[i].yAxisArr
		  			item.charType=this.ruleForm.arctList[i].chartType
		  			item.chartTemplateId=this.ruleForm.arctList[i].chartTemplateId
		  			item.axisYArr.push(this.ruleForm.arctList[i].yAxisArr)
		  			this.tableData.push(item)
//		  			console.log('赋值后222222222222',item)
		  			console.log('赋值后222222222222',item)
		  		},100)
//		  		})
		  	})(i)
		  }
		  
//		  this.tableData=aaa;
		  console.log('纳尼00000',this.tableData)
		  
		  
//		  qqq.map(qDa=>{
//for(let i=0;i<qqq.length;i++){
//		  	(function(i){
////		  		setTimeout(function(i){
////		  			console.log('赋值前11111111111',item)
////		  			item.axisYArr=[]
//let item ={}
//		  			item.chartRuleId=qDa.analyRuleId
//		  			item.axisX=qDa.xAxis
//		  			item.yAxis=qDa.yAxisArr
//		  			item.charType=qDa.chartType
//		  			item.chartTemplateId=qDa.chartTemplateId
////		  			item.axisYArr.push(qDa.yAxisArr)
////		  			item.axisYArr=qDa.chartName
//	aaa[i]=item
////	aaa=[...aaa[i]]
//		  			console.log('kkkkkk',i)
////aaa.push(item)
//console.log('赋值后222222222222',item)
////		  		},1000*i)
//		  	})(i)
////aaa.push(item)
//}
//		  })
		  

		  
		  
		  
		  
		  
    },
    mounted() {
      // 监听列表数据变化
      this.$Bus.$on('pie', data => {
        this.pie = data
//      this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
        this.tableData=[...this.tableData,...this.pie]
        this.$emit('chartList', this.tableData)
      })
      this.$Bus.$on('histogram', data => {
        this.histogram = data
//      this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
        this.tableData=[...this.tableData,...this.histogram]
        this.$emit('chartList', this.tableData)
      })
      this.$Bus.$on('lineChart', data => {
        this.lineChart = data
//      this.tableData = this.pie.concat(this.histogram).concat(this.lineChart)
        this.tableData=[...this.tableData,...this.lineChart]
        this.$emit('chartList', this.tableData)
      })
      console.log('HHHHHHHHHHHHHHH',this.tableData)
    },
    methods: {
      // 预览
      check(scope) {
        this.chartVisible = true
      },
      // 删除
      del(scope) {
        this.tableData.splice(scope.$index, 1)
        this.$emit('chartList', this.tableData)
      },
    }
	}
</script>

<style scoped>

</style>
