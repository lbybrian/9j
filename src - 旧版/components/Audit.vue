<template>
  <div class="audit">
    <el-button type="default" @click="addRule">新建规则</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="即时审计" name="1">
        <el-row class="center ruleList" v-show="activeName==='1'">
          <el-col :span="2">
            <i class="el-icon-arrow-left" @click="handleCurrentChange(currentPage, 'pre')"></i>
          </el-col>
          <el-col :span="4" v-for="item in tableData" :key="item.id">
            <div @click="checkRule(item)">{{item.name}}</div>
          </el-col>
          <el-col :span="2">
            <i class="el-icon-arrow-right" @click="handleCurrentChange(currentPage, 'next')"></i>
          </el-col>
        </el-row>
        <instant-audit v-show="activeName==='1'" :instantId="instantId"></instant-audit>
      </el-tab-pane>

      <el-tab-pane label="周期审计" name="2">
        <cycle-audit-list v-show="activeName==='2'" :obj="params"></cycle-audit-list>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="新增规则" :visible.sync="addRuleVisible" top="2vh" width="80%" @close="handleClose">
      <add-rule ref="addRule" @closeAddRule="closeAddRule"></add-rule>
    </el-dialog>
  </div>
</template>

<script>
  import AddRule from "./AddRule";
  import InstantAudit from "@/components/InstantAudit";
  import CycleAuditList from "@/components/CycleAuditList";
  const API = '/api'
  export default {
    name: "Audit",
    components: {CycleAuditList, InstantAudit, AddRule},
    data() {
      return {
        activeName: '1',
        // 数据列表
        tableData: [],
        // 分页相关
        currentPage: 1,
        pageSize: 5,
        totalPage: 0,
        // 新增规则弹框
        addRuleVisible: false,
        // 周期性参数弹框
        params: {},
        // 即时id
        instantId: '',
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
      }
    },
    created() {
      this.getList(1, 5, {})
    },
    mounted() {},
    methods: {
      // 获取规则列表
      getList(page, pageSize, params) {
        this.tableData = []
        params.pageNum = page
        params.pageSize = pageSize
        this.currentPage = page
        this.pageSize = pageSize
        let url = '/analyzeRule/getAnalyzePageList'
        this.$axios.post(API + url, params).then(r => {
          let res = r.data.data
          if (res.list.length > 0) { // 有数据
            this.tableData = res.list
            this.totalPage = res.totalPage
          } else { // 无数据
            this.tableData = []
          }
        }).catch(e => { // 请求出错
          this.$message({
            message: '请求列表失败：' + e,
            type: 'warning'
          })
        })
      },
      // 翻页
      handleCurrentChange(page, flag) {
        if (flag === 'pre') { // 前一页
          if (page <= 1) {
            page = 1
            this.$message({
              message: '当前已经是最新数据！',
              type: 'warning'
            })
            return false
          } else {
            page--
          }
        } else { // 后一页
          if (page >= this.totalPage) {
            page = this.totalPage
            this.$message({
              message: '当前已经是最早数据！',
              type: 'warning'
            })
            return false
          } else {
            page++
          }
        }
        this.getList(page, this.pageSize, {})
      },
      // 点击某一个规则
      checkRule(row) {
        this.instantId = row.id
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
      closeAddRule(val) {
        this.addRuleVisible = val
      },
    }
  }
</script>

<style scoped>
  .audit{
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
  .ruleList{
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
    border: 1px solid #244a81;
    border-radius: 4px;
    background: linear-gradient(#082031, rgba(8,58,74,0.7));
    box-shadow: 0 0 20px rgba(9,169,191,0.5);
    overflow: hidden;
    cursor: pointer;
  }
</style>
