<template>
  <!-- <div>规则详情  审计 or 规则</div> -->
  <div>
    <el-row>
      <el-col :offset="6" :span="12" class="center">
        <el-form>
          <el-form-item label="规则名称：">
            {{detail.name}}
          </el-form-item>
          <el-form-item label="规则描述：">
            {{detail.ruleDesc}}
          </el-form-item>
          <el-form-item label="规则类型：">
            {{ruleType[detail.type]}}
          </el-form-item>
          <el-form-item label="规则状态：">
            {{ruleStatus[detail.status]}}
            <el-button v-if="detail.status!=='1'&&detail.status==='2'" @click="$props.startRule(detail)" type="text" size="small">启用</el-button>
            <el-button v-if="detail.status==='1'&&detail.status!=='2'"@click="$props.stopRule(detail)" type="text" size="small">停用</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "RuleDetail",
    props: ['detail','startRule','stopRule'],
    data() {
		  return {
        // 数据字典
        dict: JSON.parse(localStorage.getItem('dict')),
        ruleType: JSON.parse(localStorage.getItem('ruleType')),
        cycleSign: JSON.parse(localStorage.getItem('cycleSign')),
        ruleStatus: JSON.parse(localStorage.getItem('ruleStatus')),
      }
    },
    created(){
      
    },
    mounted() {
		  console.log(22222222222222,this.$props.detail.type,ruleType)
		  console.log(this.$props.startRule)
    },
    watch: {
      detail: {
        handler(newValue, oldValue) {
          console.log(this.detail)
        },
        deep: true
      }
    },
 //    methods: {
 //    // 启用
 //    startRule(row) {
 //      this.$confirm('确定启用规则吗, 是否继续?', '提示', {
 //        confirmButtonText: '确定',
 //        cancelButtonText: '取消',
 //        type: 'warning'
 //      }).then(() => {
 //        console.log(this.$props)
 //        this.$axios.post(API + '/analyzeRule/updateAnalyzeRuleStatusById', {
 //          id: row.id,
 //          status: 1
 //        }).then(r => {
 //          if (r.data.code===200) {
 //            this.$message({
 //              type: 'success',
 //              message: '已启用!'
 //            });
 //            this.getList(1, 10, this.params)
 //          } else {
 //            this.$message({
 //              type: 'info',
 //              message: '启用失败!'
 //            });
 //          }
 //        })
 //        // .catch(e => {
 //        //   this.$message({
 //        //     type: 'error',
 //        //     message: '启用报错：' + e
 //        //   });
 //        // })
 //      }).catch(() => {
 //      });
 //    },
 //    // 停用
 //    stopRule(row) {
 //      this.$confirm('确定停用规则吗, 是否继续?', '提示', {
 //        confirmButtonText: '确定',
 //        cancelButtonText: '取消',
 //        type: 'warning'
 //      }).then(() => {
 //        this.$axios.post(API + '/analyzeRule/updateAnalyzeRuleStatusById', {
 //          id: row.id,
 //          status: 2
 //        }).then(r => {
 //          if (r.data.code===200) {
 //            this.$message({
 //              type: 'success',
 //              message: '已停用!'
 //            });
 //            this.getList(1, 10, this.params)
 //          } else {
 //            this.$message({
 //              type: 'info',
 //              message: '停用失败!'
 //            });
 //          }
 //        })
 //        // .catch(e => {
 //        //   this.$message({
 //        //     type: 'error',
 //        //     message: '停用报错：' + e
 //        //   });
 //        // })
 //      }).catch(() => {
 //      });
 //    }
	// },
  }
</script>

<style scoped>
  .center{
    text-align: center;
  }
</style>
