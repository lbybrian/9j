<template>
  <div>
    <!--列表-->
    <!--highlight-current-row="true"高亮-->
    <div class="list">
      <el-table class="eltable" height="600" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @cell-dblclick="checkRule" >
        <el-table-column type="index" :index="indexMethod" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="规则名称" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <div class="tableTitle ellipsis " @click="en" :class="hh">{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ruleDesc" label="规则描述">
          <template slot-scope="scope">{{scope.row.ruleDesc}}</template>
        </el-table-column>
        <el-table-column prop="status" label="规则状态" width="120">
          <template slot-scope="scope">
            <div>{{ruleStatus[scope.row.status]}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="规则类型" width="120">
          <template slot-scope="scope">{{ruleType[scope.row.type]}}</template>
        </el-table-column>
        <el-table-column prop="cycleSign" label="统计类型" width="120">
          <template slot-scope="scope">{{cycleSign[scope.row.cycleSign]}}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="200">
          <template slot-scope="scope">
            <div>{{scope.row.createTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status!=='1'&&scope.row.status==='2'" @click="startRule(scope.row)" type="text" size="small">启用</el-button>
            <el-button v-if="scope.row.status==='1'&&scope.row.status!=='2'"@click="stopRule(scope.row)" type="text" size="small">停用</el-button>
            <el-button @click="checkRule(scope.row)" type="text" size="small">详情</el-button>
            <el-button @click="resultRule(scope.row)" type="text" size="small">结果</el-button>
            <el-button @click="change(scope.row)" type="text" size="small">修改</el-button>
            <el-button v-if="scope.row.status!=='3'"@click="delRule(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="page center" v-if="total>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!--详情弹框-->
    <el-dialog v-if="checkVisible" :visible.sync="checkVisible" width="80%">
      <span slot="title">规则详情</span>
      <rule-detail :detail="detail":startRule="startRule":stopRule="stopRule" :xq='xq' :alarmRank="alarmRank" :ruleStatus="ruleStatus" :dict="dict" :ruleType="ruleType" :cycleSign="cycleSign"></rule-detail>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!--修改弹框-->
    <el-dialog v-if="changeVisible" :visible.sync="changeVisible" width="80%">
      <span slot="title">修改详情</span>
      <change-rule  :detail="detail"></change-rule>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import RuleDetail from "@/components/RuleDetail";
  import ChangeRule from "@/components/ChangeRule";
  const API = '/api'
	export default {
		name: "RuleList",
    components: {RuleDetail,ChangeRule},
    props: ['obj'],
    data() {
		  return {
		  	changeVisible:false,
		  	highlight:true,
		  	hh:false,
        xq:'',
        loading: true,
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 10,
        total: 0,
        // 当前查看的id
        currentId: '',
        // 详情
        checkVisible: false,
        // 详情信息
        detail: {},
        // 数据字典
        dict: JSON.parse(localStorage.getItem('dict')),
        ruleType: JSON.parse(localStorage.getItem('ruleType')),
        cycleSign: JSON.parse(localStorage.getItem('cycleSign')),
        ruleStatus: JSON.parse(localStorage.getItem('ruleStatus')),
        alarmRank: JSON.parse(localStorage.getItem('alarmRank')),
        // 详情title
        title: ''
      }
    },
    mounted() {
        this.getList(1, 10, {})
      // if(this.checkVisible===false){
      //     this.getList(1, 10, this.params)
      // }
    },
    beforeDestroy(){
    	this.hh=false
    	console.log('销毁前',this.hh)
    },
    created() {
    	this.hh=false
    	console.log('创建后',this.hh)
        this.getList(1, 10, {})
    },
    watch: {
      obj: {
        handler(newValue, oldValue) {
          this.getList(this.currentPage, this.pageSize, newValue)
        },
        deep: true,
        immediate: true
      },
//    detail: {
//      handler(newValue, oldValue) {
//        console.log(this.detail)
//      },
//      status,
//    deep: true,
//    immediate: true,
//    },
    },
    methods: {
    	change(row){
    		if (this.$store.state.jk3.code === 200) {
    			//模拟通过id获取一条接口数据
    			for(let i =0;i<this.$store.state.jk3.data.length;i++){
    				if(this.$store.state.jk3.data[i].id===row.id){
    					console.log(row.id)
    					this.detail = this.$store.state.jk3.data[i]
    					this.changeVisible=true
    				}
    			}
        } 
    	},
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
    	en(){
    		this.hh=true
    		console.log(this.hh)
    	},
      // 自定义表格序号
      indexMethod(index) {
        return this.pageSize*(this.currentPage - 1) + index + 1
      },
      // 根据筛选条件查询列表
       getList(page, pageSize, params) {
        this.loading = true
        this.tableData = []
        params.pageNum = page
        params.pageSize = pageSize
        this.currentPage = page
        this.pageSize = pageSize
        
          let res = this.$store.state.jk4.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.total = res.total
          } else { // 无数据
            this.tableData = []
            this.total = 0
          }
          this.loading = false
      },

      // 每页几条
      handleSizeChange(val) {
        this.pageSize = val
        this.currentPage = 1
        this.getList(this.currentPage, this.pageSize, this.obj)
      },

      // 当前第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.currentPage, this.pageSize, this.obj)
      },
      // 启用
      startRule(row) {
        this.$confirm('确定启用规则吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//        this.$axios.post(API + '/analyzeRule/updateAnalyzeRuleStatusById', {
//          id: row.id,
//          status: 1
//        }).then(r => {
//          if (r.data.code===200) {
            if (this.$store.state.jk7.code===200) {
              this.$message({
                type: 'success',
                message: '已启用!'
              });
              this.getList(1, 10, {})
              this.checkVisible = false
              status=!status
            } else {
              this.$message({
                type: 'info',
                message: '启用失败!'
              });
            }
//        }).catch(e => {
//          this.$message({
//            type: 'error',
//            message: '启用报错：' + e
//          });
//        })
//      }).catch(() => {
//      });
	})
     },
      // 停用
      stopRule(row) {
        this.$confirm('确定停用规则吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//        this.$axios.post(API + '/analyzeRule/updateAnalyzeRuleStatusById', {
//          id: row.id,
//          status: 1
//        }).then(r => {
//          if (r.data.code===200) {
            if (this.$store.state.jk7.code===200) {
              this.$message({
                type: 'success',
                message: '已停用!'
              });
              this.getList(1, 10, {})
              this.checkVisible = false
              status=!status
            } else {
              this.$message({
                type: 'info',
                message: '停用失败!'
              });
            }
//        }).catch(e => {
//          this.$message({
//            type: 'error',
//            message: '启用报错：' + e
//          });
//        })
//      }).catch(() => {
//      });
//    }).catch(() => {
//      });
			})
      },
      // 详情
      checkRule(row) {
      	//模拟通过id获取一条接口数据
    			for(let i =0;i<this.$store.state.jk3.data.length;i++){
    				if(this.$store.state.jk3.data[i].id===row.id){
    					console.log(row.id)
    					this.detail = this.$store.state.jk3.data[i]
    					this.checkVisible=true
    				}
    			}
      	
////        this.$axios.get(API + '/analyzeRule/getAnalyzeRuleById?id='+row.id, {
////          id: row.id
////        }).then(r => {
//          if (this.$store.state.jk3.code === 200) {
//            this.checkVisible = true
//            this.detail = this.$store.state.jk3.data
//            // this.getList(1, 10,this.params)
//            // this.getList(1, 10,{})
//          } else {
//            this.$message({
//              message: '展示详情失败：',
//              type: 'warning'
//            })
//          }
////        }).catch(e => {
////          this.$message({
////            message: '请求详情失败：' + e,
////            type: 'warning'
////          })
////        })

      },
      // 删除
      delRule(row) {
        this.$confirm('确定删除规则吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
//        this.$axios.post(API + '/analyzeRule/updateAnalyzeRuleStatusById', {
//          id: row.id,
//          status: 3
//        }).then(r => {
//          if (r.data.code===200) {
            if (this.$store.state.jk7.code===200) {
              this.$message({
                type: 'success',
                message: '已删除!'
              });
              this.getList(1, 10, {})
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
//        }).catch(e => {
//          this.$message({
//            type: 'error',
//            message: '删除报错：' + e
//          });
//        })
//      }).catch(() => {
        });
      },
      // 结果
      resultRule(row) {
        if (row.type === '1') { // 审计
          this.$router.push({
            path: '/auditResult',
            query: {
              id: row.id,
              cycleSign: row.cycleSign
            }
          })
        } else { // 告警
          this.$router.push({
            path: '/alarmResult',
            query: {
              id: row.id
            }
          })
        }
      },
    }
	}
</script>

<style scoped>
.eltable tr td .cell{
	overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;      /*可以显示的行数，超出部分用...表示 */
  -webkit-box-orient: vertical; 
color: red;
}
.hh{
	color: red;
}
  .center {
    text-align: center;
  }
  .page{
  	margin-bottom: 20px;
  }
  /*.list{
  	margin-bottom: 30px;
  }*/
</style>
