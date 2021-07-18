<template>
  <div>
    <el-row>
      <el-col :span="6" v-for="(item, index) in tableData" :key="item.id">
        <el-card class="center" :body-style="{padding: '5px'}">
          <div style="padding: 14px;">
            <p>编号：{{index+1}}</p>
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
    <el-dialog :visible.sync="checkVisible" width="80%">
      <span slot="title">统计详情</span>
      <instant-audit></instant-audit>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="checkVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import InstantAudit from "@/components/InstantAudit";
  const API = '/api'
	export default {
		name: "CycleAuditList",
    components: {InstantAudit},
    props: ['obj'],
    data() {
		  return {
        currentDate: new Date(),
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 16,
        total: 0,
        checkVisible: false
      }
    },
    created() {
      this.getList(1, 16, {})
    },
    mounted() {},
    methods: {
      getList(page, pageSize, params) {
        this.loading = true
        this.tableData = []
        params.pageNum = page
        params.pageSize = this.pageSize
        let url = '/abnormalAlarm/getAbnormalList'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.total = res.total
          } else { // 无数据
            this.tableData = []
            this.total = 0
          }
          this.loading = false
        }).catch(e => { // 请求出错
          this.loading = false
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
      },
      // 当前第几页
      handleCurrentChange(val) {
        this.currentPage = val
        this.getList(this.currentPage, this.pageSize, this.obj)
      },
      // 查看详情
      check(item) {
        console.log(item)
        this.checkVisible = true
      }
    }
	}
</script>

<style scoped>
  .center{
    text-align: center;
  }
</style>
