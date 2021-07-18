<template>
  <div >
  	 <!--<el-tab-pane type="card" label="表单验证" >-->
        <!--<el-row >
          <el-col :span="4" >-->
      			<div class="audit"><el-button type="default" class="elbutton" @click="addRule">表单验证</el-button></div>
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</el-tab-pane>-->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="即时审计" name="1">
        <el-row class="center ruleList" v-show="activeName==='1'">
          <el-col :span="4" v-for="item in tableData" :key="item.id"  >
            <div @click="checkRule(item)" :ref="highLightDiv" class="cell":class="namehighlight?'namehighlight':''">{{item.name}}</div>
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
    
  </div>
</template>

<script>
  import FormYz from "@/components/FormYz";
  import AuditJs from "@/components/AuditJs";
  import CycleAuditList from "@/components/CycleAuditList";
  export default {
    name: "Audit",
    components: {CycleAuditList, AuditJs,FormYz},
    data() {
      return {
      	highlight:true,
      	namehighlight:false,
        activeName: '1',
        // 数据列表
        tableData: [],
        tableData2: [],
        // 新增规则弹框
        addRuleVisible: false,
        // 即时id
        jsId: '',
        // 周期id
        cycleId: '',
      }
    },
    watch: {
      tableData: {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.checkRule(newValue[0])
          }
        },
        deep: true
      },
      tableData2: {
        handler(newValue, oldValue) {
          if (newValue.length > 0) {
            this.checkRule2(newValue[0])
          }
        },
        deep: true
      },
      activeName: {
        handler(newValue, oldValue) {
          if (newValue === '1') {
            if (this.tableData.length > 0) {
              this.checkRule(this.tableData[0])
            }
          }
        },
        deep: true
      }
    },
    created() {
      this.getList(1, 5, {})
        let r = this.$store.state.jk4;
          let res = r.data;
      console.log(11111111111,res.list.length)
    },
    mounted() {},
    methods: {
    	ss(row,col,cell,e){
    		if(this.highlight){
    			cell.style.backgroundColor="#02feff"
    			this.highlight=false
    		}else{
    			cell.style.backgroundColor="blue"
	  			this.highlight=true
    			
    		}
//  		this.highlight=!this.highlight
//  		if(cell.style.backgroundColor=="#02feff"){
//	    		cell.style.backgroundColor="blue"
//  		}else{
//  			cell.style.backgroundColor="#02feff"
//  		}
    		console.log('sssssssssssssssssssssssssss',row,col,cell,e)
    	},
    	
      // 获取即时规则列表
      getList(page, pageSize, params) {
        
        let r = this.$store.state.jk4;
          let res = r.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.totalPage = res.totalPage
          } else { // 无数据
            this.tableData = []
          }
      },
      // 获取周期规则列表
      getList2(page, pageSize, params) {
        
        let r = this.$store.state.jk4;
          let res = r.data;
          if (res.list.length > 0) { // 有数据
            this.tableData2 = res.list
            this.totalPage3 = res.totalPage
          } else { // 无数据
            this.tableData2 = []
          }
      },
      // 翻页
      // 翻页
      // 点击某一个即时性规则
      checkRule(row) {
        this.jsId = row.id
        this.namehighlight=true
        this.$refs.highLightDiv.style.backgroundColor="#02feff"
        console.log(22222222222222222,this.namehighlight)
      },
      // 点击某一个周期性规则
      checkRule2(row) {
        this.cycleId = row.id
      },
      handleClick(tab, event) {
      	console.log(tab)
        let params = {}
        if (tab.name === '1') { // 即时
          params.cycleSign = '2'
          this.getList()
        } else { // 周期
          params.cycleSign = '1'
          this.getList2()
        }
      },
      // 新增规则
      addRule() {
        this.addRuleVisible = true
      },
      // 右上角关闭弹框
      handleClose() {
        // 调用子组件的方法：清空输入域 + 关闭弹框
        this.$refs.addRule.resetForm('ruleForm')
      },
      // 子组件传值控制关闭弹框
      closeAuditRule(val) {
        this.addRuleVisible = val
        let params = {}
        if (this.activeName === '1') {
          params.cycleSign = '2'
          this.getList(1, 5, params)
        } else {
          params.cycleSign = '1'
          this.getList2(1, 5, params)
        }
      },
    }
  }
</script>
<style>
	/*.el-col.active{
  	color: #02feff!important;
}*/
</style>
<style scoped>
.namehighlight{
	color:red!important;
}
.elbutton{
	/*position: absolute;*/
	float: right;
	
}
  .audit{
  	/*background-color: #082031;*/
    padding: 20px;
    height: 100%;
    overflow-y: auto;
  }
  .audit::-webkit-scrollbar {display: none;}
  .audit { -ms-overflow-style: none; }
  .audit { overflow: -moz-scrollbars-none; }
  .center{
    text-align: center;
  }
  /*.ruleList{
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    border: 1px solid #244a81;
    border-radius: 4px;
    background: linear-gradient(#082031, rgba(8,58,74,0.7));
    box-shadow: 0 0 20px rgba(9,169,191,0.5);
    overflow: hidden;
    cursor: pointer;
  }*/
  .el-col:hover{
  	/*color: #02feff;*/
}
.el-col:active:focus{
  	/*color: #02feff!important;*/
}
</style>
