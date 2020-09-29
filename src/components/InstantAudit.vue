<template>
  <div class="instantAudit" v-loading="loading">
    <el-row>
      <el-col :span="24">
        <el-table v-loading="loading2" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.5)" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column type="index" :index="indexMethod" label="序号" width="50">
          </el-table-column>
          <el-table-column prop="softwareSign" label="软件名称">
            <template slot-scope="scope">
              <div class="tableTitle ellipsis">{{softName[scope.row.softwareSign]}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="moduleSign" label="模块名称" width="200">
            <template slot-scope="scope">{{blockName[scope.row.moduleSign]}}</template>
          </el-table-column>
          <el-table-column prop="log" label="操作类型" width="120">
            <template slot-scope="scope">{{operationType[scope.row.operationType]}}</template>
          </el-table-column>
          <el-table-column prop="log" label="日志类型" width="120">
            <template slot-scope="scope">{{logType[scope.row.logType]}}</template>
          </el-table-column>
          <el-table-column prop="user" label="操作用户" width="120">
            <template slot-scope="scope">
              <div>{{scope.row.operationUserId}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" sortable label="日期" width="200">
            <template slot-scope="scope">{{scope.row.operationTime}}</template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div class="page center" v-if="total>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage2"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize2"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  const API = '/api'
	export default {
		name: "InstantAudit",
    props: ['instantId'],
    data() {
		  return {
        loading: false,
        currentPage: 1,
        pageSize: 10,
        loading2: false,
        currentPage2: 1,
        pageSize2: 10,
        total: 0,
        tableData: [],
        params: {},
        // 数据字典
        dict: JSON.parse(localStorage.getItem('dict')),
        // 软件名称模块名下拉框联动选项
        options: JSON.parse(localStorage.getItem('dict'))['004']['dataValue'],
        softName: JSON.parse(localStorage.getItem('softName')),
        blockName: JSON.parse(localStorage.getItem('blockName')),
        logType: JSON.parse(localStorage.getItem('logType')),
        operationType: JSON.parse(localStorage.getItem('operationType')),
      }
    },
    watch: {
      instantId: {
        handler(newValue, oldValue) {
          console.log(newValue)
          this.instantId = newValue
          this.getList(this.currentPage, this.pageSize, this.params)
        },
        deep: true
      }
    },
    created() {
    },
    mounted() {
      this.params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        ruleId: this.instantId
      }
      this.getList(this.currentPage, this.pageSize, this.params)
    },
    methods: {
      // 自定义表格序号
      indexMethod(index) {
        return this.pageSize*(this.currentPage - 1) + index + 1
      },
      getList(page, pageSize, params) {
        this.loading = true
        params.pageNum = page
        params.pageSize = pageSize
        params.ruleId = 42
        let url = '/analyzeRule/executeAnalyzeRuleById'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.hits.length > 0) { // 有列表数据
            this.tableData = res.hits
            this.totalPage = res.total
          } else { // 无列表数据
            this.tableData = []
          }
          console.log(res)
          this.loading = false
        }).catch(e => { // 请求出错
          this.loading = false
          this.$message({
            message: '请求审计信息失败：' + e,
            type: 'warning'
          })
        })
      },
    }
	}
</script>

<style scoped>
 .instantAudit{
   padding: 20px;
   height: 100%;
   overflow-y: auto;
 }
 .instantAudit::-webkit-scrollbar {display: none;}
 .instantAudit { -ms-overflow-style: none; }
 .instantAudit { overflow: -moz-scrollbars-none; }
 .center{
   text-align: center;
 }
</style>
