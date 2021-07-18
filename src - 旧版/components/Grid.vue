<template>
  <div>
    <el-select v-model="result" multiple placeholder="请选择结果数据集">
      <el-option
        v-for="item in resultOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    排序字段  升序降序
  </div>
</template>

<script>
	export default {
		name: "Grid",
    data() {
      return {
        result: [],
        // 结果数据集
        resultOptions: [
          {
            label: '用户ID',
            value: 'userId'
          },
          {
            label: '系统ID',
            value: 'sysId'
          },
          {
            label: '访问次数',
            value: 'count'
          },
        ],
      }
    },
    created() {},
    methods: {

    }
	}
</script>

<style scoped>

</style>
