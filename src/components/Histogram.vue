<template>
  <div class="histogram">
    <el-row>
      <el-col :span="8">样式选择</el-col>
      <el-col :span="12">图表属性</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-row>
          <el-col :span="12">
            <div class="checkImg checked" @click="checkImg('cake', 0)">
              <img src="../assets/image/u711.png" width="100">
            </div>
          </el-col>
          <el-col :span="12">
            <div class="checkImg" @click="checkImg('loop', 1)">
              <img src="../assets/image/u712.png" width="100">
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" size="small">
          <el-form-item label="图表名称" prop="chartName" style="width: 315px;">
            <el-input v-model="ruleForm.chartName" placeholder="请输入图表名称"></el-input>
          </el-form-item>
          <el-form-item label="X轴值" prop="xAxis">
            <span>{{obj.bucketName}}</span>
          </el-form-item>
          <el-form-item label="数据值" prop="yAxisArr">
            <el-select v-model="ruleForm.yAxisArr" multiple placeholder="请选择数据值">
              <el-option v-for="item in obj.aggregationBOList" :key="item.aggName" :label="item.aggName" :value="item.aggName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="center">
            <el-button @click="resetForm('ruleForm')">重 置</el-button>
            <el-button type="primary" @click="submitForm('ruleForm')">配 置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	export default {
		name: "Histogram",
    props: ['obj'],
    data() {
      return {
        ruleForm: {
          chartTemplateId: '11',
          charType: 2,
          chartName: '',
          xAxis: this.obj.bucketName,
          yAxisArr: []
        },
        rules: {
          chartName: [
            { required: true, message: '请输入图表名称', trigger: 'blur' },
          ],
          yAxisArr: [
            { required: true, message: '请选择数据值', trigger: 'change' },
          ],
        },
        // 保存图表到已ChartList组件
        chartListData: []
      }
    },
    watch: {
      obj: {
        handler(newValue, oldValue) {
        },
        deep: true
      }
    },
    created() {},
    methods: {
      // 保存配置图表
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 添加数据到已配置图表chartList组件
            let json = {}
            for(let key in this.ruleForm) {
              json[key] = this.ruleForm[key]
            }
            this.chartListData.push(json)
            this.$Bus.$emit('chartListData', this.chartListData)
            this.ruleForm = {
              chartTemplateId: '11',
              charType: 2,
              chartName: '',
              xAxis: this.obj.bucketName,
              yAxisArr: []
            }
          } else {
            return false
          }
        })
      },
      // 重置输入域
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // 选择饼图类型
      checkImg(type, index) {
        $('.checkImg').removeClass('checked')
        $('.checkImg').eq(index).addClass('checked')
      },
    }
	}
</script>

<style scoped>
  .margin20{
    margin-top: 20px;
  }
  .checkImg{
    width: 104px;
    cursor: pointer;
  }
  .checked{
    border: 2px solid #0fcc1b;
  }
</style>
