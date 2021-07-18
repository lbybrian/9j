<template>
  <div>
    <el-row>
      <el-col :span="6" v-for="(item, index) in tableData" :key="item.id">
        <el-card class="center" :body-style="{padding: '5px'}">
          <div style="padding: 14px;">
            <p>编号：{{(currentPage-1)*pageSize + index + 1}}</p>
            <time class="time">{{item.alarmTime}}</time>
            <el-button type="text" class="button" @click="check(item)">查看结果</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!--分页-->
    <div class="page center" v-if="total>0">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[16]"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--详情弹框-->
    <el-dialog  :visible.sync="checkVisible" width="80%">
    <!--<el-dialog v-if-"checkVisible" :visible.sync="checkVisible" width="80%">-->
      <span slot="title">统计详情</span>
      	<!--<instant-audit v-show="obj.id!==''" :obj="obj"></instant-audit>-->
      	<instant-audit v-show="obj.id!==''" :obj="obj"></instant-audit>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstantAudit from "@/components/InstantAudit";
	export default {
		name: "CycleAuditList",
    components: {InstantAudit},
    props: ['cycleId'],
    data() {
		  return {
        currentDate: new Date(),
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 16,
        total: 0,
        checkVisible: false,
        params: {},
        obj: {}
      }
    },
    watch: {
      cycleId: {
        handler(newValue, oldValue) {
          // this.cycleId = newValue
          this.params.ruleId = newValue
          this.getList(this.currentPage, this.pageSize, this.params)
        },
        deep: true
      }
    },
    created() {
		  this.params.ruleId = this.cycleId
      this.getList(1, 16, this.params)
    },
    mounted() {},
    methods: {
      getList(page, pageSize, params) {
        
        let r = this.$store.state.jk8;
          let res = r.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.totalPage = res.totalPage
          } else { // 无数据
            this.tableData = []
          }
      },
      // 当前第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.currentPage, this.pageSize, {ruleId: this.cycleId})
      },
      // 查看详情
      check(item) {
        this.obj = this.$store.state.jk9;
        this.obj.id = item.id
        console.log(item.id)
//      this.obj.url = this.$store.state.jk9;
        
        
//      let r = this.$store.state.jk9;
//        let res = r.data
//        if (res.chartResultList.length > 0) { // 有数据
//          this.tableData = res.chartResultList
//          this.totalPage = res.totalPage
//        } else { // 无数据
//          this.tableData = []
//        }
      
        this.checkVisible = true
      }
    }
	}
</script>

<style scoped>
  .center{
    text-align: center;
    color: #47AFAE;
	  background: -webkit-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -moz-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -o-linear-gradient(#082031, rgba(8,58,74,0.7));
	  background: -webkit-gradient(linear, 0 0, 0 100%, from(#082031), to(rgba(8,58,74,0.7)));
	  background: linear-gradient(#082031, rgba(8,58,74,0.7));
  }
</style>
<!--<style>
  .center{
    text-align: center;
  }
div .el-row-cycle{
	background: not specified!important;
}
div .el-row-cycle .el-col-cycle{
  	color: #47AFAE!important;
    margin-bottom: 5px!important;
    border-radius: 4px!important;
    background: linear-gradient(rgba(8,58,74,0))!important;
    overflow: hidden!important;
    cursor: pointer!important;
  }
</style>-->
